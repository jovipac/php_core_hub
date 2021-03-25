import { Component, OnInit } from '@angular/core';
import {   FormBuilder,  FormGroup,   FormArray,   FormControl,   ValidatorFn } from '@angular/forms';
import { ClasificacionDerechoService } from '../../../../service/catalogos';
import { ExpedienteClasificacionDerechoService } from '../../../../service';


interface CalificacionDerecho {
  id_clasificacion_derecho: number,
  nombre: string ,
  id_parent: number ,
  order: number,
  children: Array<CalificacionDerecho>
}

@Component({
  selector: 'app-expediente-clasificacion',
  templateUrl: './expediente-clasificacion.component.html',
  styleUrls: ['./expediente-clasificacion.component.scss']
})
export class ExpedienteClasificacionComponent implements OnInit {
  public listCaliDere: Array<CalificacionDerecho>;
  form: FormGroup;
  ordersData = [];

  constructor(
    private ECservice: ClasificacionDerechoService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      ClasificacionDerechos: new FormArray([])
    });

  }

  ngOnInit(): void {
    this.getCalificacionDerecho();
  }


  submit() {}


  private buildForm(data: any): FormGroup {
    return new FormGroup({
      id_clasificacion_derecho : new FormControl({
        value: data?.id_clasificacion_derecho
      }, []),
      id_expediente: new FormControl({
        value: data?.id_expediente

      }, []),

    }, {});
  }


  getCalificacionDerecho() {
    this.ECservice.getListClasificacionDerecho().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0){
        //PADRES
        this.listCaliDere = response.result;
        console.log(response.result);
        //HIJOS
        this.getCalificacionChildren(response.result[0].id_clasificacion_derecho);

      }
      else
        this.listCaliDere.length = 0
    }, err => {
      console.log(err)
    })
  }


  getCalificacionChildren(parent){
    let ArrayParent = this.listCaliDere.filter(x => x.id_clasificacion_derecho == parent );
    console.log(ArrayParent[0].children);
    (<FormArray>this.form.get('ClasificacionDerechos')).push(this.buildForm( ArrayParent[0].children));
    return ArrayParent[0].children;
  }

}
