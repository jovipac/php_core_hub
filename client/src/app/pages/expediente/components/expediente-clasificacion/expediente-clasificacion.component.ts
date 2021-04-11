import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {   FormBuilder,  FormGroup,      FormControl,   Validators , FormArray } from '@angular/forms';
import { ClasificacionDerechoService } from '../../../../service/catalogos';
import { ExpedienteClasificacionDerechoService  , ExpedienteService , VisitasService} from '../../../../service';
import { ResultadoService ,  } from '../../../../service/catalogos';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { first, map, switchMap  } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { extractErrorMessages } from '../../../../shared/utils';
import { Expediente } from '../../../../shared/models';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import "datatables.net-buttons/js/buttons.html5.js";
import { differenceWith } from 'ramda/';


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
  @Output() submittedEvent = new EventEmitter();
  public listCaliDere: Array<CalificacionDerecho>;
  public hechosform: FormGroup;
  form: FormGroup;
  ordersData = [];
  public expedienteForm: Expediente;

  public listResultado: Array<any>;
  public listTipoDerecho: Array<any>;
  public listChildren: Array<any>;
  public listClasExpe: Array<any>;
  public listClasPos: Array<any>;
  public titleDerecho: String;
  isAddMode: boolean;
  submitted: boolean = false;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ECservice: ClasificacionDerechoService,
    private resultadoService: ResultadoService,
    private expedienteclasificacionderechoservice: ExpedienteClasificacionDerechoService,
    private formBuilder: FormBuilder,
    private expedienteservice: ExpedienteService,
    private loading: NgxSpinnerService
  ) {
    // this.form = this.formBuilder.group({
    //   ClasificacionDerechos: new FormArray([])
    // });


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCalificacionDerecho();
    this.getListResultado();
    this.buildForm();
    this.getClasificacionAsig();

    this.expedienteservice.getExpediente(this.id)
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const expediente = {
          ...data.result,
          nombre_funcionario: [
            data.result?.nombres_funcionario,
            data.result?.apellidos_funcionario
          ].filter(Boolean)
          .join(" ")
        };
        this.hechosform.patchValue(<Expediente>expediente);
        this.expedienteForm = <Expediente>expediente;
        console.log(this.expedienteForm );
      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });





  }


  submit() {}


  private buildForm() {
    this.hechosform = new FormGroup({

      id_resultado: new FormControl({
        value: null,
      }, [Validators.required]),

      id_clasificacion_derecho: new FormControl({
        value: null,
      }, [Validators.required]),

      id_clasificacion_derecho_Add: new FormControl({
        value: null,
      }, [Validators.required]),

      orders: new FormArray([  ]),



      }, { });
    }


    buildChildren(data: any) {
      return new FormGroup({
        // id_clasificacion_derecho: new FormControl(false) ,

        id_clasificacion_derecho : new FormControl({
          value: data?.id_clasificacion_derecho,
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


      }
      else
        this.listCaliDere.length = 0
    }, err => {
      console.log(err)
    })
  }


  getCalificacionChildren(){
    //titleDerecho
    this.listClasPos = [];

    let parent = this.hechosform.value.id_clasificacion_derecho;
    let ArrayParent = this.listCaliDere.filter(x => x.id_clasificacion_derecho == parent );
    this.listChildren = ArrayParent[0].children;
    this.titleDerecho = ArrayParent[0].nombre;

    const cmp = (x, y) => x.id_clasificacion_derecho === y.id_clasificacion_derecho;

    if(this.listClasExpe === undefined){
      this.listClasPos  =   this.listChildren
    }
    else{
      this.listClasPos  = differenceWith(cmp, this.listChildren, this.listClasExpe ); //=> [{a: 1}, {a: 2}]
    }




    //console.log( this.listChildren);
    // this.hechosform.controls.orders =   new FormArray([  ]);
    // let childrens = this.hechosform.controls.orders as FormArray;
    // this.listChildren.forEach(children  => {
    //   console.log(children);
    //   childrens.push(this.buildChildren(children));
    // })
    //console.log(this.hechosform.value)
    // (<FormArray>this.form.get('ClasificacionDerechos')).push(this.buildForm( ArrayParent[0].children));
    // return ArrayParent[0].children;
  }


  getListResultado() {
    this.resultadoService.getListResultado()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listResultado = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  isFieldValid(field: string) {
    return (this.hechosform.get(field).dirty || this.hechosform.get(field).touched || this.submitted) && this.hechosform.get(field).errors
  }

  isHasErrors(field: string) {
    return (this.submitted || this.hechosform.get(field).invalid || this.hechosform.get(field).errors);
  }

  displayErrorsCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  addClasi(){

    let data = {
      id_expediente:  this.id ,
      id_clasificacion_derecho :  this.hechosform.value.id_clasificacion_derecho_Add
    }


    this.expedienteclasificacionderechoservice.createExpedienteClasificacionDerecho(data).subscribe(res => {
      this.getClasificacionAsig();
      this.getCalificacionChildren();
      this.toastr.success('Registro actualizado exítosamente', 'Exito');
      this.submittedEvent.emit(false);
      this.loading.hide('step04');
    }, err => {
      this.toastr.error('Error al actualizar el registro', 'Error')
    })


  }

  UpdateAccion(){
    this.loading.show('step04');

    const formValues = {
      ...this.expedienteForm,
      id_resultado: this.hechosform.value.id_resultado
    };
    this.expedienteservice.updateExpediente(this.id, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente')
              this.submittedEvent.emit(true);
              this.loading.hide('step04');
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });
                this.submittedEvent.emit(false);
                this.loading.hide('step04');
            }
        });

  }


  getClasificacionAsig() {
    $(document).ready(function () { $('#TableclasExpedienteAsig').DataTable().destroy(); })
    let data = {
      id_expediente: this.id
    }
    this.ECservice.search(data).subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.listClasExpe = response.result;
        $(document).ready(function () {
          $('#TableclasExpedienteAsig').DataTable({
            dom: "frtip",

            language: {
              "sProcessing": "Procesando...",
              "sLengthMenu": "Mostrar _MENU_ registros",
              "sZeroRecords": "No se encontraron resultados",
              "sEmptyTable": "Ningún dato disponible en esta tabla",
              "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
              "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
              "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
              "sInfoPostFix": "",
              "sSearch": "Buscar:",
              "sUrl": "",
              "sInfoThousands": ",",
              "sLoadingRecords": "Cargando...",
              "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
              },
              "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
              },
              "buttons": {
                "excel": "Descargar excel"
              }
            },
            retrieve: true,
            data: this.listClasExpe
          });

        });

      }
    }, err => {
      console.log(err)
    })

  }


  QuitClasi(clasifi){
    this.ECservice.deleteClasificacionDerecho(clasifi.id_expediente_clas_derecho).subscribe(res => {
      this.getClasificacionAsig();
      this.toastr.success('Registro actualizado exítosamente', 'Exito');
    }, err => {
      this.toastr.error('Error al actualizar el registro', 'Error')
    })
    // Swal.fire({
    //   title: '¿Esta seguro?',
    //   text: "Desea quitar esta clasificación del derecho",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si. Estoy seguro',
    //   cancelButtonText: 'Cancelar'
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.ECservice.deleteClasificacionDerecho(clasifi.id_expediente_clas_derecho).subscribe(res => {
    //       this.getClasificacionAsig();
    //       this.toastr.error('Registro actualizado exítosamente el registro', 'success');
    //     }, err => {
    //       this.toastr.error('Error al actualizar el registro', 'Error')
    //     })
    //   }
    // })
  }




}
