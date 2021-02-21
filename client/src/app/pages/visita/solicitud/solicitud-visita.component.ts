import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ServicesService } from "../../../service/services.service";
import { CatalogosService, FuncionariosService, VisitasService, PersonasService } from '../../../service';
import { Sexo, Motivo, Funcionario } from '../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { first, map, switchMap  } from 'rxjs/operators';
import { extractErrorMessages, FormStatus } from '../../../shared/utils';
import { format, isValid, parseISO, differenceInYears } from 'date-fns';

interface Reason {
  id_motivo: number,
  nombre: string
}
interface dependency {
  id_dependencia: number,
  nombre: String
}
interface auxiliary {
  id_auxiliatura: number,
  nombre: string
}
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
  public listReason: Array<Motivo>;
  public listDependency: Array<dependency>;
  public listEmployees: Array<Funcionario>;
  public listAuxiliary: Array<auxiliary>;
  public listGenre: Array<Sexo>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private generalService: ServicesService,
    private catalogoService: CatalogosService,
    private empleadoService: FuncionariosService,
    private visitaService: VisitasService,
    private personaService: PersonasService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
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
    this.visitaForm = this.fb.group({
      id_persona: ['', [Validators.pattern("[0-9]+")]],
      cui: ['', [Validators.required, Validators.pattern("[0-9]{12,14}")]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.pattern("[0-9]{8,10}")]],
      fecha_nacimiento: ['', []],
      edad: ['', [Validators.pattern("[0-9]+")]],
      id_sexo: ['', [Validators.pattern("[0-9]+")]],
      entrada: ['', []],
      salida: ['', []],
      id_motivo: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      id_dependencia: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      id_funcionario: ['', [Validators.pattern("[0-9]+")]],
      llamadas: [0, [Validators.pattern("[0-9]+")]],
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

  toApiDate(rawDate) {
    const bDate: Date = new Date(rawDate);
    return bDate.toISOString().substring(0, 10);
  }

  getListGenre() {
    this.catalogoService.getListSexo().subscribe(res => {
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
    //const dataSend = cui ? { 'id_auxiliatura': id_auxiliatura } : {};
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

  // convenience getter for easy access to form fields
  get f() { return this.visitaForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("Probando")
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
            this.toastr.success(response.message, 'Visitas')
            this.router.navigate(['../'], { relativeTo: this.route });
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

    } else {
      this.visitaService.createVisit(formValues)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Visitas')
            this.router.navigate(['../'], { relativeTo: this.route });
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
              next: (data) => {
                  const response: any = data;
                  this.toastr.success(response.message, 'Visitas')
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: (data) => {
                  const error: HttpErrorResponse = data;
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
