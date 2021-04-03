import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuxiliaturaService, DependenciaService, MotivoService, DocumentoIdentidadService, PrioridadService, SexoService, GeneroService } from '../../../service/catalogos';
import { FuncionariosService, VisitasService, PersonasService } from '../../../service';
import { DocumentoIdentidad, Prioridad, Sexo, Genero, Auxiliatura, Dependencia, Motivo, Funcionario } from '../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { first, map, switchMap  } from 'rxjs/operators';
import { extractErrorMessages, FormStatus, isEmptyValue } from '../../../shared/utils';
import { format, isValid, parseISO, differenceInYears } from 'date-fns';

@Component({
  selector: 'app-solicitud-visita',
  templateUrl: './recepcion-visita.component.html',
  styleUrls: ['./recepcion-visita.component.scss']
})

export class RecepcionVisitaComponent implements OnInit {
  public visitaForm: FormGroup;
  formStatus = new FormStatus();
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  public listDocumentoIdentidad: Array<DocumentoIdentidad>;
  public listPriority: Array<Prioridad>;
  public listReason: Array<Motivo>;
  public listDependency: Array<Dependencia>;
  public listEmployees: Array<Funcionario>;
  public listDependencyEmployees: Array<Funcionario>;
  public listAuxiliary: Array<Auxiliatura>;
  public listSex: Array<Sexo>;
  public listGenre: Array<Genero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auxiliaturaService: AuxiliaturaService,
    private dependenciaService: DependenciaService,
    private documentoIdentidadService: DocumentoIdentidadService,
    private motivoService: MotivoService,
    private prioridadService: PrioridadService,
    private sexoService: SexoService,
    private generoService: GeneroService,
    private empleadoService: FuncionariosService,
    private visitaService: VisitasService,
    private personaService: PersonasService,
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getListDocumentoIdentidad()
    this.getListPriority()
    this.getListSex()
    this.getListGenre()
    this.getListReason()
    this.getListDependecy();
    this.getListAuxiliary();
    this.getEmployees();

    if (!this.isAddMode) {
      this.visitaService.getVisit(this.id)
          .pipe(first())
          .subscribe({
            next: (data: any) => {
              return this.visitaForm.patchValue(data.result);
            },
            error: (error:any) => {
              this.toastr.error(error.message);
            }
          });
    }
    // Se llama la construccion del formulario
    this.buildForm();
    this.setIdentificadorValidators();
  }

  dateLessThan(from: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      if (f.value < new Date()) {
        return {
          dates: "Date from should be less than Date"
        };
      }
      return {};
    }
  }

  private buildForm() {
    this.visitaForm = new FormGroup({
      id_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_documento_identidad: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      identificador: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, []),
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
      entrada: new FormControl('', []),
      salida: new FormControl('', []),
      id_motivo: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required, Validators.pattern("[0-9]+")]),
      id_dependencia: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required, Validators.pattern("[0-9]+")]),
      id_funcionario: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      llamadas: new FormControl({
        value: 0,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_prioridad: new FormControl({
        value: 2,
        disabled: false,
      }, []),
      observaciones: new FormControl({
        value: '',
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
    }, { validators: this.dateLessThan('fecha_nacimiento') });
  }

  setIdentificadorValidators() {
    const identificacion = this.visitaForm.get('identificador');
    this.visitaForm.get('id_documento_identidad').valueChanges
      .subscribe(documentoIdentidad => {

        const documento_identidad = this.listDocumentoIdentidad
          .find((documento: any) => documento.id_documento_identidad == documentoIdentidad);

        if (Boolean(documento_identidad?.requerido)) {
          identificacion.setValidators([Validators.required, Validators.pattern(/\w+/)]);
        } else {
          identificacion.setValidators(null);
        }

        identificacion.updateValueAndValidity();

      });
  }


  isFieldValid(field: string) {
    return (this.visitaForm.get(field).dirty || this.visitaForm.get(field).touched || this.submitted) && this.visitaForm.get(field).errors
  }

  isHasErrors(field: string) {
    return (this.submitted || this.visitaForm.get(field).invalid || this.visitaForm.get(field).errors);
  }

  displayErrorsCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  isFieldRequired(field: string) {
    return this.visitaForm.get(field).errors.required || false;
  }

  disableField(field: string) {
    return !this.isAddMode
  }

  calculateAge(birthDate: string) {
    if (isValid(parseISO(birthDate)) === true) {
      const years = differenceInYears(new Date(), parseISO(birthDate));
      this.visitaForm.controls['edad'].setValue(years);
    }
  }

  toApiDate(rawDate: string) {
    //return format(new Date(rawDate), 'yyyy-MM-dd');
    return (new Date(rawDate)).toISOString().substring(0, 10);
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
        error: (data) => {
          const error: HttpErrorResponse = data;
          this.toastr.error(error.message);
        }
      });
  }

  getListPriority() {
    this.prioridadService.getListPrioridad()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listPriority = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (data) => {
          const error: HttpErrorResponse = data;
          this.toastr.error(error.message);
        }
      });
  }

  getListSex() {
    this.sexoService.getListSexo().subscribe(res => {
      const response: any = res;
      if (response.result.length > 0)
        this.listSex = response.result;
      else
        this.listSex.length = 0
    }, err => {
      const error: HttpErrorResponse = err;
      this.toastr.error(error.message);
    })
  }

  getListGenre() {
    this.generoService.getListGenero()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listGenre = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  getListReason() {
    this.motivoService.getListMotivo().subscribe(res => {
      const response: any = res;
      if (response.result.length > 0)
        this.listReason = response.result;
      else
        this.listReason.length = 0
    }, err => {
      const error: HttpErrorResponse = err;
      this.toastr.error(error.message);
    })
  }

  getListDependecy() {
    this.dependenciaService.getListDependencia()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listDependency = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  getListAuxiliary() {
    this.auxiliaturaService.getListAuxiliatura()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listAuxiliary = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  getEmployees() {
    //const dataSend = id_unidad ? { 'id_dependencia': id_unidad } : {};
    this.empleadoService.getEmployees()
      .pipe(first())
      .subscribe({
        next: (data) => {
          const response: any = data;
          if (response.success) {
            const personasFormateadas = response.result
              ? response.result.map((employee) => {
                employee.nombres_completos = [
                  employee.nombres,
                  employee.apellidos
                ].filter(Boolean)
                .join(" ");
                return employee;
            }) : [];
            if (!this.isAddMode)
              this.listDependencyEmployees = personasFormateadas;
            else
              this.listEmployees = personasFormateadas;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  selectedDependency() {
    const id_dependencia = this.visitaForm.get('id_dependencia').value;
    this.listDependencyEmployees = this.listEmployees.filter((employee: any) => employee.id_dependencia == id_dependencia);
  }

  // convenience getter for easy access to form fields
  get f() { return this.visitaForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.visitaForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createVisita();
    } else {
        this.updateVisita();
    }

  }

  onNew() {
    this.visitaForm.reset();
    this.router.navigate(['/visita/solicitud/agregar'], { relativeTo: this.route });
  }

  blurDocumentoIdentidadPersona(data: any) {
    if (isEmptyValue(this.visitaForm.get('identificador').value))
      this.visitaForm.patchValue({ id_persona: '' });
  }

  public searchPersona(id_documento_identidad: number, identificador: string) {
    const dataSend = {
      'id_documento_identidad': id_documento_identidad,
      'identificador': identificador
    };

    this.personaService.searchPersona(dataSend)
      .pipe(first())
      .subscribe({
        next: (data) => {
          const response: any = data;
          if (response.success) {
            response.result.fecha_nacimiento = this.toApiDate(response.result.fecha_nacimiento);
            this.visitaForm.patchValue(response.result);
            this.toastr.success(response.message)
          } else
            this.toastr.error(response.message)
        },
        error: (response: HttpErrorResponse) => {
          if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
            const messages = extractErrorMessages(response);
            messages.forEach(propertyErrors => {
              for (let message in propertyErrors) {
                this.toastr.error(propertyErrors[message], 'Visitas');
              }
            });

          } else {
            this.toastr.error(response.error.message)
          }
          this.loading = false;
        }
      });
  }

  private createVisita() {

    let formValues = {
      ...this.visitaForm.value,
      entrada: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd HH:mm'),
      id_auxiliatura: JSON.parse(sessionStorage.getItem('validate')).id_auxiliatura,
      id_estado: 1
    };

    if (formValues.id_persona === null || formValues.id_persona === '') {
      this.personaService.createPersona(formValues).pipe(
        first(),
        map((data: any) => {
          formValues = {
            ...formValues,
            id_persona: data.result.id_persona
          }
          this.visitaForm.value.id_persona = data.result.id_persona;
          return formValues;
        }),
        switchMap((visita: any) => {
          return this.visitaService.createVisit(visita)
          .pipe(first())
        })
      )
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Visitas');
            const visita = response.result;
            this.router.navigate(['../../ticket', visita.id_visita], { relativeTo: this.route });
          },
          error: (response: HttpErrorResponse) => {
            if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
              const messages = extractErrorMessages(response);
              messages.forEach(propertyErrors => {
                for (let message in propertyErrors) {
                  this.toastr.error(propertyErrors[message], 'Visitas');
                }
              });
            } else {
              this.toastr.error(response.error.message)
            }
            this.loading = false;
          }
        });

    } else {
      this.visitaService.createVisit(formValues)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Visitas')
            const visita = response.result;
            this.router.navigate(['../../ticket', visita.id_visita], { relativeTo: this.route });
          },
          error: (response: HttpErrorResponse) => {
            if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
              const messages = extractErrorMessages(response);
              messages.forEach(propertyErrors => {
                for (let message in propertyErrors) {
                  this.toastr.error(propertyErrors[message], 'Visitas');
                }
              });

            } else {
              this.toastr.error(response.error.message)
            }
            this.loading = false;
          }
        });
    }

  }

  private updateVisita() {
      //Valor del Form, incluidos los controles deshabilitados
      const formValues = {
        ...this.visitaForm.getRawValue(),
        entrada: format(new Date(this.visitaForm.value.entrada), 'yyyy-MM-dd HH:mm'),
        salida: format(new Date(), 'yyyy-MM-dd HH:mm'),
        id_estado: 2
      };
      this.visitaService.updateVisit(this.id, formValues)
          .pipe(first())
          .subscribe({
              next: (response: any) => {
                this.toastr.success(response.message, 'Visitas')
                this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: (error: HttpErrorResponse) => {
                  const messages = extractErrorMessages(error);
                  messages.forEach(propertyErrors => {
                    for (let message in propertyErrors) {
                      this.toastr.error(propertyErrors[message], 'Visitas');
                    }
                  });
                  this.loading = false;
              }
          });
  }

}
