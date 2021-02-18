import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from "../../../service/services.service";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2'

import "datatables.net-buttons/js/buttons.html5.js";

interface auxiliary {
  id_auxiliatura: number,
  nombre: string
}

interface Reason {
  id_motivo: number,
  nombre: string
}

interface Visit {
  id_visita: number,
  id_persona: number,
  id_motivo: number,
  entrada: string,
  salida: string,
  llamadas: number,
  id_dependencia: number
}

@Component({
  selector: 'app-monitoreo-visitas',
  templateUrl: './monitoreo-visitas.component.html',
  styleUrls: ['./monitoreo-visitas.component.scss']
})
export class MonitoreoVisitasComponent implements OnInit {
  MonitorVisitas: FormGroup;
  public listAuxiliary: Array<auxiliary>;
  public listReason: Array<Reason>;
  public listVisit: Array<Visit>;
  public rol = JSON.parse(sessionStorage.getItem('validate')).rol;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private toastr: ToastrService) {
    this.buildForm();

  }

  private buildForm() {
    this.MonitorVisitas = this.formBuilder.group({

    });
  }

  ngOnInit() {
    console.log( this.rol);
    this.getListVisit()
    this.getListAuxiliary()
    this.getListReason()
  }

  onSubmit(event: Event) {


  }




  getListVisit() {
    let data = {
      id_auxiliatura: 2,
      id_motivo: 1
    }
    this.service.getListVisit(data).subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.listVisit = response.result;
        $(document).ready(function () {
          $('#listMonitor').DataTable({
            dom: "frtip",
            buttons: [
              {
                extend: 'excel', className: 'btn btn-success', exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              }
            ],
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
            data: this.listVisit
          });

        });

      } else {
        this.listVisit = [];
      }
    }, err => {
      console.log(err)
    })
  }

  getListAuxiliary() {
    this.service.getListAuxiliary().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listAuxiliary = response.result;
      else
        this.listAuxiliary.length = 0
    }, err => {
      console.log(err)
    })
  }


  getListReason() {
    this.service.getListReason().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listReason = response.result;
      else
        this.listReason.length = 0
    }, err => {
      console.log(err)
    })
  }


  markExit(visit) {
    let VisitUpdate = {
      entrada: "15:00",
      salida:  "22:00",    
      id_estado: 2
    };

    var today = new Date();
    console.log(today.setHours(today.getHours() + 4));    

     Swal.fire({
       title: '¿Esta seguro?',
       text: "Despues de dar salida a la persona, no se puede revertir la accion!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si. Estoy seguro',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.isConfirmed) {
         this.service.updateVisit(visit.id_visita , VisitUpdate ).subscribe(res => {
           let response: any = res;          
           this.toastr.success( "Ticket cerrado exitosamente", 'Monitor de atención')
           $(document).ready(function () { $('#listMonitor').DataTable().destroy(); })
           this.getListVisit();

         }, err => {
           this.toastr.error('Error al actualizar el estado de la visita', 'Error')
         })
       }
     })
  }




}
