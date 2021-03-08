import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TipoVinculacionService, DocumentoIdentidadService, SexoService, GeneroService, PrioridadService } from '../../../../service/catalogos';
import { ExpedientePersonaService } from '../../../../service';
import { ToastrService } from 'ngx-toastr';
import { ExpedientePersona, DocumentoIdentidad, Sexo, Genero, TipoVinculacion, Prioridad } from '../../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { isEmptyValue } from '../../../../shared/utils';
import { isValid, parseISO, differenceInYears } from 'date-fns';
import { extractErrorMessages } from '../../../../shared/utils';
@Component({
  selector: 'app-expediente-persona',
  templateUrl: './expediente-persona.component.html',
  styleUrls: ['./expediente-persona.component.scss']
})
export class ExpedientePersonaComponent implements OnInit {
  public personaForm: FormGroup;
  id_expediente: string;
  id_persona: string;
  isAddMode: boolean;
  submitted = false;
  loading = false;

  public listDocumentoIdentidad: Array<DocumentoIdentidad>;
  public listTipoVinculacion: Array<TipoVinculacion>;
  public listSexo: Array<Sexo>;
  public listGenero: Array<Genero>;
  public listPrioridad: Array<Prioridad>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private solicitudPersonaService: ExpedientePersonaService,
    private tipoVinculacionService: TipoVinculacionService,
    private documentoIdentidadService: DocumentoIdentidadService,
    private sexoService: SexoService,
    private generoService: GeneroService,
    private prioridadService: PrioridadService,

  ) { }

  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente;

    this.getListDocumentoIdentidad();
    this.getListTipoVinculacion();
    this.getListSexo();
    this.getListGenero();
    this.getlistPrioridad();

    if (!this.isAddMode) {
      if (!isEmptyValue(this.id_expediente) && !isEmptyValue(this.id_persona)) {
        const dataSend = { 'id_expediente': this.id_expediente, 'id_persona': this.id_persona };
        this.solicitudPersonaService.searchExpedientePersona(dataSend)
          .pipe(first())
          .subscribe({
            next: (data: any) => {
              const personasFormateadas = data.result
                ? data.result.map((employee) => {
                  employee.nombres_completos = [
                    employee.nombres,
                    employee.apellidos
                  ].filter(Boolean)
                    .join(" ");
                  return <ExpedientePersona>employee;
                }) : [];

              this.personaForm.patchValue(personasFormateadas);
            },
            error: (error: any) => {
              this.toastr.error(error.message);
            }
          });
      }
    }

    // Se llama la construccion del formulario
    this.buildForm();
  }

  private buildForm() {
    this.personaForm = new FormGroup({
      id_expediente: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_documento_identidad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      identificador: new FormControl({
        value: '',
        disabled: false,
      }, [Validators.required,
      Validators.pattern("[0-9A-z]+")]),
      nombres: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required,
      Validators.minLength(2)]),
      apellidos: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required,
      Validators.minLength(2)]),
      email: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
      telefono: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]{8,10}")]),
      fecha_nacimiento: new FormControl({
        value: null,
        disabled: false,
      }, []),
      edad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_sexo: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_genero: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_prioridad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_tipo_vinculacion: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]*")]),
      codigo_casillero: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]*")]),
      observaciones: new FormControl({
        value: '',
        disabled: false,
      }, []),
    }, {});
  }

  isFieldValid(field: string) {
    return (this.personaForm.get(field).dirty || this.personaForm.get(field).touched || this.submitted) && this.personaForm.get(field).errors
  }

  isHasErrors(field: string) {
    return (this.submitted || this.personaForm.get(field).invalid || this.personaForm.get(field).errors);
  }

  displayErrorsCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  calculateAge(birthDate: string) {
    if (isValid(parseISO(birthDate)) === true) {
      const years = differenceInYears(new Date(), parseISO(birthDate));
      this.personaForm.controls['edad'].setValue(years);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.personaForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.personaForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.updatePersonaSolicitud();
    } else {
        this.updatePersonaSolicitud();
    }

  }

  getListDocumentoIdentidad() {
    this.documentoIdentidadService.getListDocumentoIdentidad()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listDocumentoIdentidad = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListSexo() {
    this.sexoService.getListSexo()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listSexo = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListGenero() {
    this.generoService.getListGenero()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listGenero = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListTipoVinculacion() {
    this.tipoVinculacionService.getListTipoVinculacion()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listTipoVinculacion = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getlistPrioridad() {
    this.prioridadService.getListPrioridad()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listPrioridad = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  private updatePersonaSolicitud() {
    const formValues = {
      ...this.personaForm.value,
    };
    this.solicitudPersonaService.updateExpedientePersona(this.id_expediente, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente')
              //step02Modal.hide();
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });
                this.loading = false;
            }
        });
  }

}
