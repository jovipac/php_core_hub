import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ExpedienteDocumentoService, ExpedienteDocumentoArchivoService } from '../../../../service';
import { PlantillaDocumentoService } from '../../../../service/catalogos';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { first } from 'rxjs/operators';
import { isEmptyValue, extractErrorMessages } from '../../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-expediente-documento',
  templateUrl: './expediente-documento.component.html',
  styleUrls: ['./expediente-documento.component.scss']
})
export class ExpedienteDocumentoComponent implements OnInit {
  @Input() id_expediente_documento: number;
  @Output() submittedEvent = new EventEmitter();

  id_expediente: number;
  isAddMode: boolean;
  readOnlyEditor: boolean = false;
  submitted: boolean = false;
  uploader: FileUploader;
  formDocumento: FormGroup;
  textEditorConfig: object;

  public listPlantillaDocumento: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private plantillaDocumentoService: PlantillaDocumentoService,
    private expedienteDocumentoService: ExpedienteDocumentoService,
    private expedienteDocumentoArchivoService: ExpedienteDocumentoArchivoService,
    private loading: NgxSpinnerService,
  ) {
    this.uploader = new FileUploader({
      url: expedienteDocumentoArchivoService.uploadURL,
      disableMultipart: false,
      method: 'POST',
      authToken: `${JSON.parse(sessionStorage.getItem('validate')).token_type} ${JSON.parse(sessionStorage.getItem('validate')).access_token}`,
    });
  }


  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente_documento;

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.response.subscribe(async (suscriptor: string) => {
      try {
        if (suscriptor) {
          const dataInput = JSON.parse(suscriptor);
          const dataSend = {
            'id_expediente': dataInput.result.params?.id_expediente,
            'id_expediente_documento': dataInput.result.params?.id_expediente_documento,
            'ubicacion': dataInput.result.path,
            'nombre': dataInput.result.filename,
            'tamanio': dataInput.result.size,
            'mime': dataInput.result.mime,
          };

          const response: any = await this.expedienteDocumentoArchivoService.createExpedienteDocumentoArchivo(dataSend).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Archivo adjunto del Documento');
            this.loading.hide('step05');
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
        this.loading.hide('step05');
      }

    });

    this.getListPlantillaDocumento();

    // Inicializacion del editor de texto
    this.textEditorConfig = {
      base_url: '/tinymce',
      suffix: '.min',
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'template searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'template | undo redo | formatselect | bold italic underline backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }

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
      id_plantilla_documento: new FormControl({
        value: data?.id_plantilla_documento,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      texto: new FormControl({
        value: data?.texto,
        disabled: false,
      }, []),
      archivos_adjuntos: new FormControl({
        value: data?.archivos_adjuntos,
        disabled: false,
      }, []),
    }, {});
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

  getListPlantillaDocumento() {
    this.plantillaDocumentoService.getListPlantillaDocumento()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listPlantillaDocumento = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  getExpedienteDocumento(id_expediente_documento: number) {
    this.loading.show('step05');
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
              //this.formDocumento = this.buildForm(documentoFormateado);
              this.formDocumento.patchValue(documentoFormateado);
            }

          } else
            this.toastr.error(response.message);
          this.loading.hide('step05');
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide('step05');
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
        this.loading.show('step05');
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

            this.loading.hide('step05');

          } else {
            completedProcess = false;
          }
          this.submittedEvent.emit(completedProcess);
        } else {
          documento = { ...documento, };
          let response: any = await this.expedienteDocumentoService.updateExpedienteDocumento(documento.id_expediente_documento, documento).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Documento del expediente');
            completedProcess = true;

            // Pasos para guardar los archivos adjuntos
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('id_expediente', this.id_expediente);
              form.append('id_expediente_documento', documento.id_expediente_documento);
            };
            this.uploader.uploadAll();

            this.loading.hide('step05');

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
        this.loading.hide('step05');
      }

  }


}
