import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService, ExpedientePersonaService } from '../../../service';
import { Expediente, ExpedientePersona } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  providers: [ NgbModalConfig, NgbModal ]
})
export class SolicitudComponent implements OnInit {
  private id: string;
  isAddMode: boolean;
  id_expediente_persona: number;
  public solicitud: Expediente;
  public solicitudPersonas: Array<ExpedientePersona>;

  constructor(
    private solicitudService: ExpedienteService,
    private solicitudPersonaService: ExpedientePersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private configNgbModal: NgbModalConfig,
    private modalService: NgbModal,
    private loading: NgxSpinnerService
  ) {
    configNgbModal.backdrop = 'static';
    configNgbModal.keyboard = true;
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
              data.result.id_auxiliatura,
              data.result.anio, data.result.folio),
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

  }

  goEditExpedientePerson(persona) {
    this.id_expediente_persona = persona.id_expediente_persona;
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  showModalStep(content: any) {
    this.modalService.open(content, { size: "xl" });
  }
  dismissModalStep() {
    this.modalService.dismissAll();
  }
  submitModalStep(isSubmitCompleted:any) {
    if(isSubmitCompleted){
      this.modalService.dismissAll("success");
    }
  }

}
