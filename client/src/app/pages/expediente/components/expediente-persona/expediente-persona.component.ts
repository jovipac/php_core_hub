import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from "@angular/forms";
import { TipoVinculacionService, DocumentoIdentidadService, SexoService, GeneroService, TipoDireccionService } from '../../../../service/catalogos';
import { DepartamentoService, MunicipioService } from '../../../../service/catalogos';
import { DocumentoIdentidadPersonaService, ExpedientePersonaService, PersonasService } from '../../../../service';
import { ToastrService } from 'ngx-toastr';
import { ExpedientePersona, DocumentoIdentidad, Sexo, Genero, TipoDireccion } from '../../../../shared/models';
import { TipoVinculacion, Departamento, Municipio } from '../../../../shared/models';
import { TypeaheadMatch, TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { first, distinctUntilChanged, filter, switchMap, map, catchError } from 'rxjs/operators';
import { isEmptyValue } from '../../../../shared/utils';
import { format, isValid, parseISO, differenceInYears } from 'date-fns';
import { extractErrorMessages } from '../../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";

export function getTypeaheadConfig(): TypeaheadConfig {
  return Object.assign(new TypeaheadConfig(), { cancelRequestOnFocusLost: true });
}
@Component({
  selector: 'app-expediente-persona',
  templateUrl: './expediente-persona.component.html',
  styleUrls: ['./expediente-persona.component.scss'],
  providers: [{ provide: TypeaheadConfig, useFactory: getTypeaheadConfig }]
})
export class ExpedientePersonaComponent implements OnInit {
  @Input() id_expediente_persona: number;
  @Output() submittedEvent = new EventEmitter();

  suggestions: Observable<any>;
  personaForm: FormGroup;
  direcciones: FormArray;
  id_expediente: number;
  id_persona: number;
  isAddMode: boolean;
  submitted: boolean = false;
  isSelectedID: boolean = false;

  public listDocumentoIdentidad: Array<DocumentoIdentidad>;
  public listTipoVinculacion: Array<TipoVinculacion>;
  public listSexo: Array<Sexo>;
  public listGenero: Array<Genero>;
  public listTipoDireccion: Array<TipoDireccion>;
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
    private tipoDireccionService: TipoDireccionService,
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
    this.getListTipoDireccion();
    this.getListDepartamento();
    this.getListMunicipio();

    // Finalmente se llama la construccion del formulario
    this.buildForm();

    this.suggestions = new Observable((observer: Observer<string>) => observer.next(this.personaForm.get('identificador').value))
      .pipe(
        distinctUntilChanged(),
        filter((term:string) => term.length >= 3),
        switchMap((searchText) => {
          const dataSend = {
            'id_documento_identidad': this.personaForm.get('id_documento_identidad').value,
            'identificador': searchText
          };
          console.log(searchText);
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


    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_persona)) {
        this.getPersonaExpediente(this.id_expediente_persona);
      }
    } else{
      this.addDireccion({});
    }

  }

  private buildForm() {
    this.personaForm = new FormGroup({
      id_expediente_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_expediente: new FormControl({
        value: this?.id_expediente,
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
      id_tipo_vinculacion: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]*")]),
      codigo_casillero: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]*")]),
      direcciones: new FormArray([])

    }, {});
  }

  buildDireccion(data: any) {
    return new FormGroup({
      id_persona_direccion : new FormControl({
        value: data?.id_persona_direccion,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_persona: new FormControl({
        value: data?.id_persona,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_tipo_direccion: new FormControl({
        value: data?.id_tipo_direccion,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_departamento: new FormControl({
        value: data?.id_departamento,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_municipio: new FormControl({
        value: data?.id_municipio,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      direccion: new FormControl({
        value: data?.direccion,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
      comentarios: new FormControl({
        value: data?.comentarios,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
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

  displayValidation(value: boolean) {
    return {
      'is-invalid': value
    };
  }

  displayValidationMsg(value: boolean) {
    const cssStyle = Boolean(value) ? 'valid-feedback' : 'invalid-feedback';
    return cssStyle;
  }

  calculateAge(birthDate: string) {
    if (isValid(parseISO(birthDate)) === true) {
      const years = differenceInYears(new Date(), parseISO(birthDate));
      this.personaForm.controls['edad'].setValue(years);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.personaForm.controls; }

  addDireccion(data: any): void {
    this.direcciones = this.personaForm.get('direcciones') as FormArray;
    this.direcciones.push(this.buildDireccion(data));
  }

  removeTabHandler(tab: any): void {
    this.direcciones.removeAt(tab);
    console.log('Remove Tab handler',tab);
  }

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
            const personaFormateada = !isEmptyValue(persona) ? {
              ...persona,
              fecha_nacimiento: format(parseISO(new Date(persona.fecha_nacimiento).toISOString()), 'yyyy-MM-dd'),
              nombres_completos: [
                persona.nombres,
                persona.apellidos
              ].filter(Boolean)
                .join(" ")
            } : {};
            this.id_persona = persona.id_persona;
            this.personaForm.patchValue(personaFormateada);

            if (isEmptyValue(persona.direcciones)) {
              this.addDireccion({});
            } else {
              let direcciones = this.personaForm.controls.direcciones as FormArray;
              persona.direcciones.forEach(direccion  => {
                direcciones.push(this.buildDireccion(direccion));
              })
            }

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

  getListTipoDireccion() {
    this.tipoDireccionService.getListTipoDireccion()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listTipoDireccion = response.result;
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
            this.listDepartamentoMunicipio = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  selectedDepartamento(idx: number) {
    const id_departamento = this.personaForm.get('direcciones').value[idx].id_departamento;
    this.listDepartamentoMunicipio = this.listMunicipio
      .filter((departamento: any) => departamento.id_departamento == id_departamento);
  }

  changeDocumentoIdentidadPersona(data: any) {
    if (isEmptyValue(this.personaForm.get('identificador').value) || !this.isSelectedID)
      this.personaForm.patchValue({ id_persona: '' });
    //this.isSelectedID = Boolean(this.instance.dismissPopup());
  }

  setDocumentoIdentidadPersona(data: TypeaheadMatch) {
    this.isSelectedID = true; //this.instance.isPopupOpen();
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
      flag_confidencial: Boolean(this.personaForm.get('flag_confidencial').value)
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
            this.submittedEvent.emit(true);
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
            this.submittedEvent.emit(false);
            this.loading.hide();
          }
        });

    } else {
      this.loading.show();
      this.solicitudPersonaService.createExpedientePersona(formValues)
        .pipe(
          first(),
          map((data: any) => {
            formValues = {
              ...formValues,
              id_expediente_persona: data.result.id_expediente_persona
            }
            this.id_persona = data.result.id_persona;
            return formValues;
          }),
          switchMap((data: any) => {
            formValues.direcciones = formValues.direcciones.map((direccion) => {
              direccion.id_persona_direccion = direccion.id_persona_direccion || null;
              direccion.id_persona = data.id_persona || null;
              return direccion;
            });
            return this.personaService.updatePersona(this.id_persona, formValues)
              .pipe(first())
          })
        )
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Solicitud')
            this.submittedEvent.emit(true);
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
            this.submittedEvent.emit(false);
            this.loading.hide();
          }
        });
    }

  }

  private updatePersonaSolicitud() {
    //Valor del Form, incluidos los controles deshabilitados
    const formValues = {
      ...this.personaForm.getRawValue(),
    };
    this.loading.show();
    this.solicitudPersonaService.updateExpedientePersona(this.id_expediente_persona, formValues)
        .pipe(
          first(),
          switchMap((solicitud: any) => {
            return this.personaService.updatePersona(this.id_persona, formValues)
            .pipe(first())
          })
        )
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente');
              this.submittedEvent.emit(true);
              this.loading.hide();
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });
                this.submittedEvent.emit(false);
                this.loading.hide();
            }
        });
  }

}
