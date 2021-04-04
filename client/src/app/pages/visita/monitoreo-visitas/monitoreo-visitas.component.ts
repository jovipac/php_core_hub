import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from "../../../service/services.service";
import { ExpedienteService } from '../../../service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2'
import { extractErrorMessages, FormStatus } from '../../../shared/utils';
import "datatables.net-buttons/js/buttons.html5.js";
import { format } from 'date-fns';

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
  id_dependencia: number,
  nombre_motivo: string,
  nombres: string,
  apellidos: string,
  edad: number
}

@Component({
  selector: 'app-monitoreo-visitas',
  templateUrl: './monitoreo-visitas.component.html',
  styleUrls: ['./monitoreo-visitas.component.scss']
})
export class MonitoreoVisitasComponent implements OnInit {
  MonitorVisitas: FormGroup;
  formStatus = new FormStatus();
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  tipo: string;
  titulo: string;

  public listAuxiliary: Array<auxiliary>;
  public listReason: Array<Reason>;
  public listVisit: Array<Visit>;
  public rol = JSON.parse(sessionStorage.getItem('validate')).rol;
  public auxiliatura = JSON.parse(sessionStorage.getItem('validate')).id_auxiliatura;
  public MostrarDiv: boolean = false;
  public ChangeAux: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private Expservice: ExpedienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.buildForm();

  }

  private buildForm() {
    this.MonitorVisitas = new FormGroup({
      id_auxiliatura: new FormControl({
        value: '',
        disabled: !this.ChangeAux,
      }, [Validators.required, Validators.pattern("[0-9]+")]),
      id_motivo: new FormControl({
        value: '',

      }, [Validators.required, Validators.pattern("[0-9]+")]),
    });
  }

  ngOnInit() {
    // MOTIVO 1 DENUNCIAS  ---- 2 VISISTA PERSONAL
    this.tipo = this.route.snapshot.params['id'];

    if (this.tipo === "1") {
      this.titulo = "Denuncias";
    } else {
      this.titulo = "Visitas Personales";
    }

    this.getListVisit();

    if (this.rol == 1) {
      this.ChangeAux = true;
      this.getListAuxiliary()
    } else {
      this.ChangeAux = false;
    }

    // Se llama la construccion del formulario
    this.buildForm();
  }

  onSubmit() {


  }

  getListVisit() {
    let Auxiliatura;
    if (this.rol == 1) {
      Auxiliatura = this.MonitorVisitas.value.id_auxiliatura;
    } else {
      Auxiliatura = this.auxiliatura;
    }


    let data = {
      id_auxiliatura: Auxiliatura,
      id_motivo: this.tipo,
      id_estado: 1
    }
    this.service.getListVisit(data).subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.toastr.success("Resultado de Tickets");
        this.MostrarDiv = true;
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
        this.MostrarDiv = false;
        this.toastr.error("Sin resultado de Tickets")
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


  markExit(visit, estado) {
    let d = new Date();
    let mes = d.getMonth() + 1;
    let hour = d.getFullYear() + "-" + mes + "-" + d.getDay() + " " + d.getHours() + ":" + d.getMinutes();
    let msj = "";

    if (estado == 2) {
      msj = "Despues de marcar como atendido, no se puede revertir la accion!"
    } else {
      msj = "Despues de marcar como retirada a la persona, no se puede revertir la accion!"
    }

    let VisitUpdate = {
      salida: format(new Date(), 'yyyy-MM-dd HH:mm'),
      entrada: visit.entrada,
      id_estado: estado
    };


    Swal.fire({
      title: '¿Esta seguro?',
      text: msj,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si. Estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.updateVisit(visit.id_visita, VisitUpdate).subscribe(res => {
          let response: any = res;

          if (estado == 2) {
            let dataExpe = {
              "id_visita": visit.id_visita,
              "anio": d.getFullYear(),
              "fecha_ingreso": format(new Date(), 'yyyy-MM-dd HH:mm'),
              "id_via": "PE",
              "id_prioridad": visit.id_prioridad,
              "id_funcionario": visit.id_funcionario,
              "id_persona": visit.id_persona,
              "id_auxiliatura": this.auxiliatura
            }

            if (this.tipo === "1") {
              this.Expservice.createExpediente(dataExpe).subscribe(res => {
                let response: any = res;
                const exp = response.result;
                this.router.navigate(['../../../expediente/solicitud/editar', exp.id_expediente], { relativeTo: this.route });

              }, err => {
                this.toastr.error('Error al actualizar el estado de la visita', 'Error');
              })
            }else {
              this.toastr.success("Ticket actualizado exitosamente", 'Monitor de atención')  ;
              this.getListVisit();
            }
          } else {
            this.toastr.success("Ticket retirado exitosamente", 'Monitor de atención')
            $(document).ready(function () { $('#listMonitor').DataTable().destroy(); })
            this.getListVisit();
          }
        }, err => {
          this.toastr.error('Error al actualizar el estado de la visita', 'Error')
        })
      }
    })
  }



  GoEdit(visit) {
    this.router.navigate(['../../solicitud/editar', visit.id_visita], { relativeTo: this.route });

  }




}
