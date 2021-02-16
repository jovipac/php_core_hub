import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ServicesService } from "../../../service/services.service";
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
  private visitaForm: FormGroup;
  private isAddMode: boolean;
  id: string;
  public listDependency: Array<dependency>;
  public listAuxiliary: Array<auxiliary>;

  constructor(
    private route: ActivatedRoute,
    private commonService: ServicesService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getListDependecy();
    this.getListAuxiliary();

    if (!this.isAddMode) {
      this.commonService.updateOficial(this.id, this.visitaForm.value)
          .pipe(first())
          .subscribe(x => this.visitaForm.patchValue(x));
    }
  }

  private buildForm() {
    this.visitaForm = this.formBuilder.group({
      id_persona: ["", []],
      cui: ["", [Validators.required]],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      telefono: ["", []],
      fecha_nacimiento: [null, []],
      edad: ["", []],
      id_sexo: [null, []],
      id_motivo: [null, []],
      id_dependencia: [null, [Validators.required]],
      id_funcionario: [null, [Validators.required]],
      llamadas: [0, []],
    });
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

  onSubmit(event: Event) {
    event.preventDefault();

  }

}
