import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ServicesService } from "../../../service/services.service";
import { PrioridadService, SexoService, GeneroService } from '../../../service/catalogos';
import { FuncionariosService, VisitasService, PersonasService } from '../../../service';
import { Prioridad, Sexo, Genero, Auxiliatura, Dependencia, Motivo, Funcionario } from '../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { first, map, switchMap  } from 'rxjs/operators';
import { extractErrorMessages, FormStatus } from '../../../shared/utils';
import { format, isValid, parseISO, differenceInYears } from 'date-fns';

@Component({
  selector: 'app-solicitud-visita',
  templateUrl: './solicitud-visita.component.html',
  styleUrls: ['./solicitud-visita.component.scss']
})

export class SolicitudVisitaComponent implements OnInit {
  public visitaForm: FormGroup;
  formStatus = new FormStatus();
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  public listPriority: Array<Prioridad>;
  public listReason: Array<Motivo>;
  public listDependency: Array<Dependencia>;
  public listEmployees: Array<Funcionario>;
  public listDependencyEmployees: Array<Funcionario>;
  public listAuxiliary: Array<Auxiliatura>;
  public listSex: Array<Sexo>;
  public listGenre: Array<Genero>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private generalService: ServicesService,
    private prioridadService: PrioridadService,
    private sexoService: SexoService,
    private generoService: GeneroService,
    private empleadoService: FuncionariosService,
    private visitaService: VisitasService,
    private personaService: PersonasService,
  ) {
    //this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
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
          .subscribe(res => {
            const data: any = res;
            return this.visitaForm.patchValue(data.result);
          });
    }
    // Se llama la construccion del formulario
    this.buildForm();
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
      id_persona: new FormControl('', [Validators.pattern("[0-9]+")]),
      cui: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, [Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(12),
        Validators.maxLength(15)]),
      nombres: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, [Validators.required,
      Validators.minLength(2)]),
      apellidos: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, [Validators.required,
      Validators.minLength(2)]),
      telefono: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]{8,10}")]),
      fecha_nacimiento: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, []),
      edad: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_sexo: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_genero: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      entrada: new FormControl('', []),
      salida: new FormControl('', []),
      id_motivo: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.required, Validators.pattern("[0-9]+")]),
      id_dependencia: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.required, Validators.pattern("[0-9]+")]),
      id_funcionario: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      llamadas: new FormControl({
        value: 0,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_prioridad: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, []),
      observaciones: new FormControl({
        value: '',
        disabled: !this.isAddMode,
      }, []),
    }, { validators: this.dateLessThan('fecha_nacimiento') });
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
    this.generoService.getListGenero().subscribe(res => {
      const response: any = res;
      if (response.result.length > 0)
        this.listGenre = response.result;
      else
        this.listGenre.length = 0
    }, err => {
      const error: HttpErrorResponse = err;
      this.toastr.error(error.message);
    })
  }

  getListReason() {
    this.generalService.getListReason().subscribe(res => {
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
    this.generalService.getListDependency().subscribe(res => {
      const response: any = res;
      if (response.result.length > 0)
        this.listDependency = response.result;
      else
        this.listDependency.length = 0
    }, err => {
      const error: HttpErrorResponse = err;
      this.toastr.error(error.message);
    })
  }

  getListAuxiliary() {
    this.generalService.getListAuxiliary().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listAuxiliary = response.result;
      else
        this.listAuxiliary.length = 0
    }, err => {
      const error: HttpErrorResponse = err;
      this.toastr.error(error.message);
    })
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
        error: (data) => {
          const error: HttpErrorResponse = data;
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

  public searchPersona(cui: string) {
    const dataSend = { 'cui': cui };
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
        error: (data) => {
          const error: HttpErrorResponse = data;
          this.toastr.error(error.message);
          this.loading = false;
        }
      });
  }

  private createVisita() {
    let formValues = {
      ...this.visitaForm.value,
      entrada: format(new Date(), 'HH:mm'),
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
      const formValues = {
        ...this.visitaForm.value,
        entrada: format(new Date(this.visitaForm.value.entrada), 'HH:mm'),
        salida: format(new Date(), 'HH:mm'),
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
