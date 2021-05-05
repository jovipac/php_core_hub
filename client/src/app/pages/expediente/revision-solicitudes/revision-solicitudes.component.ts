import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService } from '../../../service';
import { Expediente } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { isEmptyValue } from '../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrorMessages } from '../../../shared/utils';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import "datatables.net-buttons/js/buttons.html5.js";

@Component({
  selector: 'app-revision-solicitudes',
  templateUrl: './revision-solicitudes.component.html',
  styleUrls: ['./revision-solicitudes.component.scss']
})
export class RevisionSolicitudesComponent implements OnInit {
  id_expediente: number;
  tipo: number;
  estadoSiguiente: number;
  public listSolicitudes: Array<Expediente>;

  constructor(
    private solicitudService: ExpedienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loading.show('dashboard');
    this.tipo = this.route.snapshot.params['id'];
    if(this.tipo == 1){
      this.estadoSiguiente = 2;
    }else{
      this.estadoSiguiente = 3;
    }


    console.log(this.tipo);
    let data = {
      id_estado_expediente: this.tipo
    }
    this.listExpediente(data);
  }

  listExpediente(dataSend: any) {
    this.solicitudService.searchExpediente(dataSend)
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const expedientesFormateadas = data.result
        ? data.result.map((data:any) => {
          const expediente = {
          ...data,
          correlativo: formatearCorrelativo(
            null, data.anio, data.folio),
          nombre_completo_funcionario: [
            data?.nombres_funcionario,
            data?.apellidos_funcionario
          ].filter(Boolean)
            .join(" ")
          };
          $(document).ready(function () {
            $('#list').DataTable({
              dom: "Bfrtip",
              buttons: [
                {
                  extend: 'excel', className: 'btn btn-outline-primary', exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
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
              data: this.expediente
            });

          });

          return <Expediente>expediente;
      }) : [];

      this.listSolicitudes = expedientesFormateadas;

      },
      error: (error:any) => {
        this.toastr.error(error.message);

      }
    });
  }

  goEditExpediente(expediente: any) {
    this.id_expediente = expediente.id_expediente;
    this.router.navigate(['../../solicitud/editar', expediente.id_expediente], { relativeTo: this.route });
  }

  UpdateAccion(  expediente: any){

    const formValues = {
      ...expediente,
      id_estado_expediente: this.estadoSiguiente
    };
    this.solicitudService.updateExpediente(expediente.id_expediente , formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente');
              let data = {
                id_estado_expediente: this.tipo
              }
              this.listExpediente(data);

            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });

            }
        });

  }

}
