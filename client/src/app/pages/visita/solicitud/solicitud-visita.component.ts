import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ServicesService } from "../../../service/services.service";
import { VisitasService } from '../../../service/visitas.service';
import { PersonasService } from '../../../service/personas.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

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
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  public listDependency: Array<dependency>;
  public listAuxiliary: Array<auxiliary>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private commonService: ServicesService,
    private visitaService: VisitasService,
    private personaService: PersonasService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getListDependecy();
    this.getListAuxiliary();

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
      id_motivo: ['', [Validators.pattern("[0-9]+")]],
      id_dependencia: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      id_funcionario: ['', [Validators.required, Validators.pattern("[0-9]+")]],
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
    console.log(this.isAddMode);
    return !this.isAddMode
  }

  getListDependecy() {
    this.commonService.getListDependency().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listDependency = response.result;
      else
        this.listDependency.length = 0
    }, err => {
      console.log(err)
    })
  }

  getListAuxiliary() {
    this.commonService.getListAuxiliary().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listAuxiliary = response.result;
      else
        this.listAuxiliary.length = 0
    }, err => {
      console.log(err)
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.visitaForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("Probando")
    // stop here if form is invalid
    if (this.visitaForm.invalid) {
      console.log(this.visitaForm)
      return;
    } else {
      console.log(this.visitaForm.value)
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createVisita();
    } else {
        this.updateVisita();
    }

  }

  public searchPersona(cui:string) {
    const dataSend = { 'cui': cui };
    this.personaService.searchPersona(dataSend)
        .pipe(first())
        .subscribe({
            next: (data) => {
                const response: any = data;
                if (response.success)
                  this.toastr.success(response.message)
                else
                  this.toastr.error(response.message)
            },
            error: (data) => {
                const error: any = data;
                this.toastr.error(error.message);
                this.loading = false;
            }
        });
  }

  private createVisita() {
    this.visitaService.createVisit(this.visitaForm.value)
        .pipe(first())
        .subscribe( res => {
          const response: any = res;
          this.toastr.success(response.message, 'Visitas')
          this.router.navigate(['../'], { relativeTo: this.route });
        }, err =>{
          const error: any = err;
          this.toastr.error(error.message, 'Visitas');
          this.loading = false;
        });
  }

  private updateVisita() {
      this.visitaService.updateVisit(this.id, this.visitaForm.value)
          .pipe(first())
          .subscribe({
              next: (data) => {
                  const response: any = data;
                  this.toastr.success(response.message, 'Visitas')
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: (data) => {
                  const error: any = data;
                  this.toastr.error(error.message, 'Visitas');
                  this.loading = false;
              }
          });
  }

}
