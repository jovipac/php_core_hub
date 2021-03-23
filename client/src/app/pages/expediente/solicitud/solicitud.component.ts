import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService, ExpedientePersonaService, ExpedienteHechoService, ExpedienteClasificacionDerechoService, ExpedienteDocumentoService } from '../../../service';
import { Expediente, ExpedientePersona, ExpedienteHecho, ExpedienteClasificacionDerecho, ExpedienteDocumento } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { isEmptyValue } from '../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  providers: [ CarouselConfig ]
})
export class SolicitudComponent implements OnInit {
  private id: string;
  isAddMode: boolean;
  id_expediente_persona: number;
  id_expediente_documento: number;
  public solicitud: Expediente;
  private configNgbModal: object;
  public solicitudPersonas: Array<ExpedientePersona>;
  public solicitudHechos: Array<ExpedienteHecho>;
  public solicitudClasificacionDerechos: Array<ExpedienteClasificacionDerecho>;
  public solicitudDocumentos: Array<ExpedienteDocumento>;

  constructor(
    private solicitudService: ExpedienteService,
    private solicitudPersonaService: ExpedientePersonaService,
    private expedienteHechoService: ExpedienteHechoService,
    private expedienteClasificacionDerechosService: ExpedienteClasificacionDerechoService,
    private expedienteDocumentoService: ExpedienteDocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private configNgbCarousel: CarouselConfig,
    private modalService: BsModalService,
    private loading: NgxSpinnerService
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
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.loading.show();
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
          this.loading.hide();
        },
        error: (error:any) => {
          this.toastr.error(error.message);
          this.loading.hide();
        }
      });

      const dataSend = this.id ? { 'id_expediente': this.id } : {};
      this.listExpedientePersonas(dataSend);
      this.listExpedienteHechos(dataSend);
      this.listExpedienteClasificacionDerecho(dataSend);
      this.listExpedienteDocumentos(dataSend);
    }

  }

  listExpedientePersonas(dataSend: any) {
    this.solicitudPersonaService.searchExpedientePersona(dataSend)
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const personasFormateadas = data.result
        ? data.result.map((employee) => {
          employee.nombres_completos = [
            employee.nombres,
            employee.apellidos
          ].filter(Boolean)
          .join(" ");
          return <ExpedientePersona>employee;
      }) : [];

        this.solicitudPersonas = personasFormateadas;
      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });
  }

  listExpedienteHechos(dataSend: any) {
    this.loading.show();
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
          this.loading.hide();
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide();
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

}
