import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TipoVinculacionService, DocumentoIdentidadService, SexoService, GeneroService, PrioridadService } from '../../../../service/catalogos';
import { DepartamentoService, MunicipioService } from '../../../../service/catalogos';
import { DocumentoIdentidadPersonaService, ExpedientePersonaService, PersonasService } from '../../../../service';
import { ToastrService } from 'ngx-toastr';
import { ExpedientePersona, DocumentoIdentidad, Sexo, Genero, Prioridad } from '../../../../shared/models';
import { TipoVinculacion, Departamento, Municipio } from '../../../../shared/models';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, debounceTime, distinctUntilChanged, filter, switchMap, map, catchError } from 'rxjs/operators';
import { isEmptyValue } from '../../../../shared/utils';
import { format, isValid, parseISO, differenceInYears } from 'date-fns';
import { extractErrorMessages } from '../../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-expediente-persona',
  templateUrl: './expediente-persona.component.html',
  styleUrls: ['./expediente-persona.component.scss']
})
export class ExpedientePersonaComponent implements OnInit {
  @Input() id_expediente_persona: number;
  @Output() submittedEvent = new EventEmitter();
  @ViewChild('instance') instance: NgbTypeahead;

  personaForm: FormGroup;
  id_expediente: number;
  id_persona: string;
  isAddMode: boolean;
  submitted: boolean = false;
  isSelectedID: boolean = false;

  public listDocumentoIdentidad: Array<DocumentoIdentidad>;
  public listTipoVinculacion: Array<TipoVinculacion>;
  public listSexo: Array<Sexo>;
  public listGenero: Array<Genero>;
  public listPrioridad: Array<Prioridad>;
  public listDepartamento: Array<Departamento>;
  public listMunicipio: Array<Municipio>;
  public listDepartamentoMunicipio: Array<Municipio>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private solicitudPersonaService: ExpedientePersonaService,
    private tipoVinculacionService: TipoVinculacionService,
    private documentoIdentidadService: DocumentoIdentidadService,
    private documentoIdentidadPersonaService: DocumentoIdentidadPersonaService,
    private sexoService: SexoService,
    private generoService: GeneroService,
    private prioridadService: PrioridadService,
    private personaService: PersonasService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private loading: NgxSpinnerService
  ) { }


  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente_persona;

    this.getListDocumentoIdentidad();
    this.getListTipoVinculacion();
    this.getListSexo();
    this.getListGenero();
    this.getListPrioridad();
    this.getListDepartamento();
    this.getListMunicipio();

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_persona)) {
        this.getPersonaExpediente(this.id_expediente_persona);
      }
    }

    // Finalmente se llama la construccion del formulario
    this.buildForm();
  }

  private buildForm() {
    this.personaForm = new FormGroup({
      id_expediente_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_expediente: new FormControl({
        value: this.id_expediente || null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      flag_confidencial: new FormControl({
        value: null,
        disabled: false,
      }, []),
      id_documento_identidad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      identificador: new FormControl({
        value: '',
        disabled: false,
      }, [Validators.required]),
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
      id_departamento: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_municipio: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      comentarios: new FormControl({
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

    if (this.isAddMode) {
        this.createPersonaSolicitud();
    } else {
        this.updatePersonaSolicitud();
    }

  }

  getPersonaExpediente(id_expediente_persona) {
    this.loading.show();
    this.solicitudPersonaService.getExpedientePersona(id_expediente_persona)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const persona = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const personaFormateada = {
              ...persona,
              fecha_nacimiento: format(parseISO(new Date(persona.fecha_nacimiento).toISOString()), 'yyyy-MM-dd'),
              nombres_completos: [
                persona.nombres,
                persona.apellidos
              ].filter(Boolean)
                .join(" ")
            };
            this.personaForm.patchValue(personaFormateada);
          } else
            this.toastr.error(response.message);
          this.loading.hide();
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide();
        }
      });
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

  getListPrioridad() {
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

  getListDepartamento() {
    this.departamentoService.getListDepartamento()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listDepartamento = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListMunicipio() {
    this.municipioService.getListMunicipio()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listMunicipio = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  selectedDepartamento() {
    const id_departamento = this.personaForm.get('id_departamento').value;
    this.listDepartamentoMunicipio = this.listMunicipio
      .filter((departamento: any) => departamento.id_departamento == id_departamento);
  }

  public searchByIdentificacion = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 3),
      switchMap((searchText) => {
        const dataSend = {
          'id_documento_identidad': this.personaForm.get('id_documento_identidad').value,
          'identificador': searchText
        };
        return this.documentoIdentidadPersonaService.searchDocumentoIdentidadPersona(dataSend)
      }),
      catchError((response: HttpErrorResponse) => {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Solicitud');
            }
          });
        } else
          this.toastr.error(response.error.message);

        return [];
      }),
      map((response: any) => { return response.result })
    );
  }

  protected changeDocumentoIdentidadPersona(data: any) {
    if (isEmptyValue(this.personaForm.get('identificador').value) || !this.isSelectedID)
      this.personaForm.patchValue({ id_persona: '' });
    this.isSelectedID = Boolean(this.instance.dismissPopup());
  }
  protected resultFormatDocumentoIdentidadPersona(data: any) {
    return data.identificador;
  }
  protected inputFormatocumentoIdentidadPersona(data: any) {
    if (data.identificador)
      return data.identificador
    return data;
  }
  protected setDocumentoIdentidadPersona(data: any) {
    this.isSelectedID = this.instance.isPopupOpen();
    const selected = {
      'id_documento_identidad': data.item.id_documento_identidad,
      'id_persona': data.item.id_persona
    };
    this.personaForm.patchValue(selected);
    this.searchPersona({
      ...selected,
      'identificador': data.item.identificador
    });
  }

  public searchPersona(dataSend: object) {
    this.loading.show();
    this.personaService.searchPersona(dataSend)
      .pipe(first())
      .subscribe({
        next: (data) => {
          const response: any = data;
          if (response.success) {
            response.result.fecha_nacimiento = format(parseISO(new Date(response.result.fecha_nacimiento).toISOString()), 'yyyy-MM-dd');
            this.personaForm.patchValue(response.result);
            this.toastr.success(response.message)
          } else
            this.toastr.error(response.message);
          this.loading.hide();
        },
        error: (response: HttpErrorResponse) => {
          if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
            const messages = extractErrorMessages(response);
            messages.forEach(propertyErrors => {
              for (let message in propertyErrors) {
                this.toastr.error(propertyErrors[message], 'Solicitud');
              }
            });

          } else {
            this.toastr.error(response.error.message)
          }
          this.loading.hide();
        }
      });
  }

  private createPersonaSolicitud() {
    let formValues = {
      ...this.personaForm.value,
      id_expediente: this.id_expediente,
    };

    if (isEmptyValue(formValues.id_persona)) {
      this.loading.show();
      this.personaService.createPersona(formValues).pipe(
        first(),
        map((data: any) => {
          formValues = {
            ...formValues,
            id_persona: data.result.id_persona
          }
          this.personaForm.value.id_persona = data.result.id_persona;
          return formValues;
        }),
        switchMap((solicitud: any) => {
          return this.solicitudPersonaService.createExpedientePersona(solicitud)
          .pipe(first())
        })
      )
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Solicitud');
            const solicitud = response.result;
            this.loading.hide();
          },
          error: (response: HttpErrorResponse) => {
            if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
              const messages = extractErrorMessages(response);
              messages.forEach(propertyErrors => {
                for (let message in propertyErrors) {
                  this.toastr.error(propertyErrors[message], 'Solicitud');
                }
              });
            } else {
              this.toastr.error(response.error.message)
            }
            this.loading.hide();
          }
        });

    } else {
      this.loading.show();
      this.solicitudPersonaService.createExpedientePersona(formValues)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Solicitud')
            const solicitud = response.result;
            this.loading.hide();
          },
          error: (response: HttpErrorResponse) => {
            if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
              const messages = extractErrorMessages(response);
              messages.forEach(propertyErrors => {
                for (let message in propertyErrors) {
                  this.toastr.error(propertyErrors[message], 'Solicitud');
                }
              });

            } else {
              this.toastr.error(response.error.message)
            }
            this.loading.hide();
          }
        });
    }

  }

  private updatePersonaSolicitud() {
    const formValues = {
      ...this.personaForm.value,
    };
    this.loading.show();
    this.solicitudPersonaService.updateExpedientePersona(this.id_expediente_persona, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente')
              this.loading.hide();
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });
                this.loading.hide();
            }
        });
  }

}
