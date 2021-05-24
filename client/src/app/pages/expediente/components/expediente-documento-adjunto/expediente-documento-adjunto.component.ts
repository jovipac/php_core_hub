import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteDocumentoService, ExpedienteService } from '../../../../service';
import { TipoDocumentoService } from '../../../../service/catalogos';
import { isEmptyValue, extractErrorMessages } from '../../../../shared/utils';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-expediente-documento-adjunto',
  templateUrl: './expediente-documento-adjunto.component.html',
  styleUrls: ['./expediente-documento-adjunto.component.scss']
})
export class ExpedienteDocumentoAdjuntoComponent implements OnInit {
  @Input() id_expediente_documento: number;
  @Output() submittedEvent = new EventEmitter();

  id_expediente: number;
  isAddMode: boolean;
  submitted: boolean = false;
  uploader: FileUploader;
  formDocumento: FormGroup;

  public listtipoDoc: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private expedienteDocumentoService: ExpedienteDocumentoService,
    private tipodocumentoService: TipoDocumentoService,
    private loading: NgxSpinnerService,
    //private expedienteservice: ExpedienteService,
  ) {
    this.uploader = new FileUploader({
      url: expedienteDocumentoService.uploadURL,
      disableMultipart: false,
      method: 'POST',
      authToken: `${JSON.parse(sessionStorage.getItem('validate')).token_type} ${JSON.parse(sessionStorage.getItem('validate')).access_token}`,
    });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente_documento;

    this.getListtipodocumento();

    this.uploader.response.subscribe(async (suscriptor: string) => {
      try {
        if (suscriptor) {
          const dataInput = JSON.parse(suscriptor);
          const dataSend = {
            'id_expediente_documento': dataInput.result.params?.id_expediente_documento,
            'ubicacion': dataInput.result.path,
            'nombre': dataInput.result.filename,
            'tamanio': dataInput.result.size,
            'mime': dataInput.result.mime,
          };

          const response: any = await this.expedienteDocumentoService.updateExpedienteDocumento(dataInput.result.params?.id_expediente_documento, dataSend).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Archivo adjunto del Documento');
          } else {
            this.toastr.error(response.message)
          }

        }
      } catch (response) {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Archivo adjunto del Documento');
            }
          });
        } else {
          this.toastr.error(response.error.message)
        }

      }
    });

    // Inicializacion del formulario
    this.formDocumento = this.buildForm({});

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_documento) && this.id_expediente_documento > 0) {
        this.getExpedienteDocumento(this.id_expediente_documento);
      }

    } else {
      this.formDocumento = this.buildForm({});
    }
  }

  displayValidation(value: boolean) {
    return {
      'is-invalid': value
    };
  }

  displayValidationMsg(value: boolean) {
    const cssStyle = Boolean(value) ? 'valid-feedback' : 'invalid-feedback';
    return cssStyle;
  }

  // convenience getter for easy access to form fields
  get f() { return this.formDocumento.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formDocumento.invalid) {
      return;
    }
    // Se procede a agregar o actualizar
    this.createOrUpdateDocumento()

  }

  private buildForm(data: any): FormGroup {
    return new FormGroup({
      id_expediente_documento : new FormControl({
        value: data?.id_expediente_documento,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_expediente: new FormControl({
        value: data?.id_expediente,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      titulo: new FormControl({
        value: data?.titulo,
        disabled: false,
      }, []),
      id_tipo_documento: new FormControl({
        value: data?.id_tipo_documento,
        disabled: false,
      }, []),
      remitente: new FormControl({
        value: data?.remitente,
        disabled: false,
      }, []),
      nombre: new FormControl({
        value: data?.nombre,
        disabled: false,
      }, []),
      observaciones: new FormControl({
        value: data?.observaciones,
        disabled: false,
      }, []),
    }, {});
  }

  getExpedienteDocumento(id_expediente_documento: number) {
    this.loading.show('step06');
    this.expedienteDocumentoService.getExpedienteDocumento(id_expediente_documento)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const documento = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const documentoFormateado = !isEmptyValue(documento) ? {
              ...documento,
            } : {};
            if (isEmptyValue(documentoFormateado)) {
              this.formDocumento = this.buildForm({});
            } else {
              this.formDocumento.patchValue(documentoFormateado);
            }

          } else
            this.toastr.error(response.message);
          this.loading.hide('step06');
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide('step06');
        }
      });
  }

  getListtipodocumento() {
    this.tipodocumentoService.getListtipodocumento()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listtipoDoc = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  private async createOrUpdateDocumento() {
    let completedProcess = false;
    //Valor del Form, incluidos los controles deshabilitados
    let documento = {
      ...this.formDocumento.getRawValue(),
    };

      try {
        this.loading.show('step06');
        if (isEmptyValue(documento.id_expediente_documento) && documento.id_expediente_documento != 0) {
          documento = {
            ...documento,
            id_expediente: this.id_expediente,
          };
          let response: any = await this.expedienteDocumentoService.createExpedienteDocumento(documento).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Documento del expediente');
            completedProcess = true;

            // Pasos para guardar los archivos adjuntos
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('id_expediente', this.id_expediente);
              form.append('id_expediente_documento', response.result.id_expediente_documento);
            };
            this.uploader.uploadAll();

            this.loading.hide('step06');

          } else {
            completedProcess = false;
          }
          this.submittedEvent.emit(completedProcess);
        } else {
          documento = { ...documento, };
          let response: any = await this.expedienteDocumentoService.upgradeExpedienteDocumento(documento.id_expediente_documento, documento).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Documento del expediente');
            completedProcess = true;

            // Pasos para guardar los archivos adjuntos
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('id_expediente', this.id_expediente);
              form.append('id_expediente_documento', documento.id_expediente_documento);
            };
            this.uploader.uploadAll();

            this.loading.hide('step06');

          } else {
            completedProcess = false;
          }
          this.submittedEvent.emit(completedProcess);

        }
      } catch(response) {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Documento del expediente');
            }
          });

        } else {
          this.toastr.error(response.error.message)
        }
        completedProcess = false;
        this.loading.hide('step06');
      }

      if (completedProcess === true) {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }

  }

}
