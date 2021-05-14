import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlantillaDocumentoService , TipoDocumentoService } from '../../../service/catalogos';
import { first } from 'rxjs/operators';
import { isEmptyValue, extractErrorMessages } from '../../../shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditTemplateComponent implements OnInit {
  id_plantilla_documento: number;
  isAddMode: boolean;
  readOnlyEditor: boolean = false;
  submitted: boolean = false;
  formDocumento: FormGroup;
  textEditorConfig: object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private plantillaDocumentoService: PlantillaDocumentoService,
    private loading: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.id_plantilla_documento = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_plantilla_documento;

    // Inicializacion del editor de texto
    this.textEditorConfig = {
      //selector: '#classic',
      base_url: '/tinymce',
      suffix: '.min',
      height: 500,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'template searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'template | undo redo | formatselect | bold italic underline backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
      language: 'es_MX'
    }

    // Inicializacion del formulario
    this.formDocumento = this.buildForm({});

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_plantilla_documento) && this.id_plantilla_documento > 0) {
        this.getPlantillaDocumento(this.id_plantilla_documento);
      }

    } else {
      this.formDocumento = this.buildForm({});
    }

  }

  private buildForm(data: any): FormGroup {
    return new FormGroup({
      id_plantilla_documento: new FormControl({
        value: data?.id_plantilla_documento,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_clasificacion_plantilla: new FormControl({
        value: data?.id_clasificacion_plantilla,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      titulo: new FormControl({
        value: data?.titulo,
        disabled: false,
      }, []),
      texto: new FormControl({
        value: data?.texto,
        disabled: false,
      }, []),
      id_etapa: new FormControl({
        value: data?.id_etapa,
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

  onNew() {
    this.formDocumento.reset();
    this.router.navigate(['/plantilla-documento/create'], { relativeTo: this.route });
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

  getPlantillaDocumento(id_plantilla_documento: number) {
    this.loading.show('step05');
    this.plantillaDocumentoService.getPlantillaDocumento(id_plantilla_documento)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const plantilla = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const plantillaFormateado = !isEmptyValue(plantilla) ? {
              ...plantilla,
            } : {};
            if (isEmptyValue(plantillaFormateado)) {
              this.formDocumento = this.buildForm({});
            } else {
              //this.formDocumento = this.buildForm(plantillaFormateado);
              this.formDocumento.patchValue(plantillaFormateado);
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
    let plantilla = {
      ...this.formDocumento.getRawValue(),
    };

      try {
        this.loading.show('step05');
        if (isEmptyValue(plantilla.id_plantilla_documento) && plantilla.id_plantilla_documento != 0) {
          plantilla = {
            ...plantilla,
            id_clasificacion_plantilla: 1,
          };
          let response: any = await this.plantillaDocumentoService.createPlantillaDocumento(plantilla).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Documento del expediente');
            completedProcess = true;
            this.loading.hide('step05');

          } else {
            completedProcess = false;
          }
          //this.submittedEvent.emit(completedProcess);
        } else {
          plantilla = { ...plantilla, };
          let response: any = await this.plantillaDocumentoService.updatePlantillaDocumento(plantilla.id_plantilla_documento, plantilla).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Documento del expediente');
            completedProcess = true;
            this.loading.hide('step05');

          } else {
            completedProcess = false;
          }
          //this.submittedEvent.emit(completedProcess);

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

      if (completedProcess === true) {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }

  }

}
