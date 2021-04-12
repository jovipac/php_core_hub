import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ExpedienteDocumentoService } from '../../../../service';
import { MotivoService } from '../../../../service/catalogos';
import { Motivo } from '../../../../shared/models';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  formDocumento: FormGroup;
  textEditorConfig: object;

  public listMotivo: Array<Motivo>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private motivoService: MotivoService,
    private expedienteDocumentoService: ExpedienteDocumentoService,
    private loading: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente;

    this.getListMotivo()

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
        'template | undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }

    // Inicializacion del formulario
    this.formDocumento =  new FormGroup({
      documentos: new FormArray([])
    });

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_documento) && this.id_expediente_documento > 0) {
        this.getExpedienteDocumento(this.id_expediente_documento);
      }
      else if (!isEmptyValue(this.id_expediente) && this.id_expediente_documento == 0) {
        const dataSend = { 'id_expediente': this.id_expediente };
        this.searchExpedienteDocumento(dataSend);
      } else
        this.addDocumento({});
    } else {
      this.addDocumento({});
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

  addDocumento(data: any) {
    (<FormArray>this.formDocumento.get('documentos')).push(this.buildForm(data));
    //this.formDocumento = this.buildForm(data);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formDocumento.invalid) {
      return;
    }
    // Se procede a agregar o actualizar
    this.createOrUpdateDocumento()

  }

  getListMotivo() {
    this.motivoService.getListMotivo()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listMotivo = response.result;
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
              this.addDocumento({});
            } else {
              this.addDocumento(documentoFormateado);
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

  searchExpedienteDocumento(dataSend: any) {
    this.loading.show('step05');
    this.expedienteDocumentoService.searchExpedienteDocumento(dataSend)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const documentos = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const documentosFormateado = !isEmptyValue(documentos) ? documentos.map((documento: any) => {
              return { ...documento, }
            }) : [];

            if (isEmptyValue(documentosFormateado)) {
              this.addDocumento({});
            } else {
              documentosFormateado.forEach(documento  => {
                this.addDocumento(documento);
              })
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
    let formValues = {
      ...this.formDocumento.getRawValue(),
    };

    let result = formValues.documentos.forEach(async (documento: any) => {
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

    });
    //result = await Promise.all([promise1, promise2, promise3]);
    //this.submittedEvent.emit(result);
  }


}
