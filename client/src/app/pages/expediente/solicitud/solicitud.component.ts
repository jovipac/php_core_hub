import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService, ExpedientePersonaService, ExpedienteHechoService, ExpedienteClasificacionDerechoService, ExpedienteDocumentoService , ExpedienteComentarioService  } from '../../../service';
import { ClasificacionDerechoService } from '../../../service/catalogos';
import { Expediente, ExpedientePersona, ExpedienteHecho, ExpedienteClasificacionDerecho, ExpedienteDocumento } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalService , BsModalRef } from 'ngx-bootstrap/modal';
import { isValid, parseISO , format } from 'date-fns';
import { isEmptyValue } from '../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import "datatables.net-buttons/js/buttons.html5.js";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrorMessages } from '../../../shared/utils';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  providers: [ CarouselConfig ]
})
export class SolicitudComponent implements OnInit {
  public modalRef: BsModalRef;
  private id: string;
  isAddMode: boolean;
  id_expediente_persona: number;
  id_expediente_documento: number;
  id_estado : number;
  public solicitud: Expediente;
  private configNgbModal: object;
  public solicitudPersonas: Array<ExpedientePersona>;
  public solicitudHechos: Array<ExpedienteHecho>;
  public solicitudClasificacionDerechos: Array<ExpedienteClasificacionDerecho>;
  public solicitudDocumentos: Array<ExpedienteDocumento>;
  public listClasExpe: Array<any>;
  public listComment: Array<any>;
  public errorState: boolean = false;
  public formcomentarios: FormGroup;

  contComment: number;

  constructor(
    private solicitudService: ExpedienteService,
    private solicitudPersonaService: ExpedientePersonaService,
    private expedienteHechoService: ExpedienteHechoService,
    private expedienteClasificacionDerechosService: ExpedienteClasificacionDerechoService,
    private expedientecomentarioservice: ExpedienteComentarioService,
    private expedienteDocumentoService: ExpedienteDocumentoService,
    private clasificacionderechoservice: ClasificacionDerechoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private configNgbCarousel: CarouselConfig,
    private modalService: BsModalService,
    private loading: NgxSpinnerService ,
    private formBuilder: FormBuilder
  ) {
    this.configNgbModal = {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: true
    }

    configNgbCarousel.pauseOnFocus = true;
    configNgbCarousel.showIndicators = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.contComment = 0 ;
    this.isAddMode = !this.id;
    this.buildFormComment();

    if (!this.isAddMode) {
      this.loading.show('dashboard');
      this.solicitudService.getExpediente(this.id)
      .pipe(first())
      .subscribe({
        next: (data:any) => {
          const expediente = {
            ...data.result,
            correlativo: formatearCorrelativo(
              null, data.result.anio, data.result.folio),
            nombre_funcionario: [
              data.result?.nombres_funcionario,
              data.result?.apellidos_funcionario
            ].filter(Boolean)
              .join(" ")
          };
          this.solicitud = <Expediente>expediente;
          this.id_estado =  this.solicitud.id_estado_expediente;
          this.loading.hide('dashboard');
        },
        error: (error:any) => {
          this.toastr.error(error.message);
          this.loading.hide('dashboard');
        }
      });

      const dataSend = this.id ? { 'id_expediente': this.id } : {};
      this.listExpedientePersonas(dataSend);
      this.listExpedienteHechos(dataSend);
      this.listExpedienteClasificacionDerecho(dataSend);
      this.listExpedienteDocumentos(dataSend);
      this.getClasificacionAsig();
      this.Getcomment();

    }

  }

  private buildFormComment() {
    this.formcomentarios = this.formBuilder.group({
      comentario: [""],
      id_usuario: ["", ]
    });
  }

  listExpedientePersonas(dataSend: any) {
    this.solicitudPersonaService.searchExpedientePersona(dataSend)
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const personasFormateadas = data.result
        ? data.result.map((persona) => {
          persona.nombres_completos = [
            persona.nombres,
            persona.apellidos
          ].filter(Boolean)
          .join(" "),
          persona.nombre_tipos_vinculacion = !isEmptyValue(persona.id_tipo_vinculacion) ?
              persona.id_tipo_vinculacion.map( tipo_vinculacion => tipo_vinculacion.nombre_tipo_vinculacion)
              .join(', ') : '';
          return <ExpedientePersona>persona;
      }) : [];

        this.solicitudPersonas = personasFormateadas;
      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });
  }

  listExpedienteHechos(dataSend: any) {
    this.loading.show('dashboard');
    this.expedienteHechoService.searchExpedienteHecho(dataSend)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const hechos = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const hechosFormateado = !isEmptyValue(hechos) ? hechos.map((hecho: any) => {
              return <ExpedienteHecho>hecho;
            }) : [];

            if (isEmptyValue(hechosFormateado)) {
              this.solicitudHechos = [];
            } else {
              this.solicitudHechos = hechosFormateado;
            }

          } else
            this.toastr.error(response.message);
          this.loading.hide('dashboard');
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide('dashboard');
        }
      });
  }

  listExpedienteDocumentos(dataSend: any) {
    this.expedienteDocumentoService.searchExpedienteDocumento(dataSend)
    .pipe(first())
    .subscribe({
      next: (response:any) => {
        if (response.success) {
          const documentos = response.result;
          // Se formatea la informacion para adecuarla al formulario
          const documentosFormateado = !isEmptyValue(documentos) ? documentos.map((documento: any) => {
            documento = {
              ...documento,
              created_at: isValid(parseISO(documento?.created_at)) ?
                new Date(documento.created_at) : null,
            }
            return <ExpedienteDocumento>documento;
          }) : [];

          if (isEmptyValue(documentosFormateado)) {
            this.solicitudDocumentos = [];
          } else {
            this.solicitudDocumentos = documentosFormateado;
          }

        } else
          this.toastr.error(response.message);

      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });
  }

  listExpedienteClasificacionDerecho(dataSend: any) {
    this.expedienteClasificacionDerechosService.searchExpedienteClasificacionDerecho(dataSend)
    .pipe(first())
    .subscribe({
      next: (response:any) => {
        if (response.success) {
          const clasificacionderechos = response.result;
          // Se formatea la informacion para adecuarla al formulario
          const clasificacionderechosFormateado = !isEmptyValue(clasificacionderechos) ? clasificacionderechos.map((clasificacionderecho: any) => {
            return <ExpedienteClasificacionDerecho>clasificacionderecho;
          }) : [];

          if (isEmptyValue(clasificacionderechosFormateado)) {
            this.solicitudClasificacionDerechos = [];
          } else {
            this.solicitudClasificacionDerechos = clasificacionderechosFormateado;
          }

        } else
          this.toastr.error(response.message);

      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });
  }

  goEditExpedientePerson(persona: any) {
    this.id_expediente_persona = persona.id_expediente_persona;
  }
  goEditExpedienteDocumento(documento: any) {
    this.id_expediente_documento = documento.id_expediente_documento;
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  showModalStep(content: any) {
    this.modalService.show(content, this.configNgbModal);
  }
  dismissModalStep() {
    this.modalService.hide();
  }
  submitModalStep(isSubmitCompleted:any) {
    if(isSubmitCompleted){
      this.modalService.hide();
    }
  }

  getClasificacionAsig() {
    let data = {
      id_expediente: this.id
    }
    this.clasificacionderechoservice.search(data).subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.listClasExpe = response.result;
        $(document).ready(function () {
          $('#TableclasExpediente').DataTable({
            dom: " ",

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

  openModal(content, code) {
    this.errorState = false;
    this.modalRef = this.modalService
      .show(content, { class: 'modal-xl', backdrop: 'static', keyboard: true });

  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  SaveComment(){
    let data = {
      id_expediente: this.id ,
      comentario : this.formcomentarios.value.comentario,
      fecha: format(new Date(), 'yyyy-MM-dd')
    }

    this.expedientecomentarioservice.createexpedientecomentario(data).subscribe(res => {

      this.toastr.success("Comentario agregado con exito", 'Comentarios de solicitud');
      this.Getcomment();
      this.formcomentarios.reset();
    }, err => {
      this.toastr.warning( "No se pudo crear el comentario", 'Comentarios de solicitud')
      console.log(err)
    })

  }

  Getcomment(){
    let data = {
      id_expediente: this.id
    }

    $(document).ready(function () { $('#tblComentarios').DataTable().destroy(); })
    this.expedientecomentarioservice.searchexpedientecomentario(data).subscribe(res => {
      let response: any = res;

      if (response.result.length > 0) {
        this.contComment = response.result.length;
        this.listComment = response.result;
        $(document).ready(function () {
          $('#tblComentarios').DataTable({
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

            },
            retrieve: true,
            data: this.listUsers
          });

        });


      } else {
        this.contComment = 0 ;
      }
    }, err => {

      this.toastr.warning( "No se pudo listar los usuarios inactivos", 'Listado de usuarios ')
      console.log(err)
    })

  }

  UpdateStateExpe(_estado) {
    if (this.solicitudDocumentos.length == 0){
      this.toastr.warning( "No se han adjuntado documentos a la solicitud", 'Comentarios de solicitud')
    }else{
      Swal.fire({
        title: '¿Esta seguro?',
        text: "De actualizar el estado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si. Estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.UpdateAccion(_estado);
        }
      })
    }

  }

  UpdateAccion(_state){

    const formValues = {
      ...this.solicitud,
      id_estado_expediente: _state
    };
    this.solicitudService.updateExpediente(this.id, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente')

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
