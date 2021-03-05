import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService, ExpedientePersonaService } from '../../../service';
import { Expediente, ExpedientePersona } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  private id: string;
  isAddMode: boolean;
  public solicitudForm: Expediente;
  public solicitudPersonaForm: ExpedientePersona;

  constructor(
    private solicitudService: ExpedienteService,
    private solicitudPersonaService: ExpedientePersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.solicitudService.getExpediente(this.id)
      .pipe(first())
      .subscribe({
        next: (data:any) => {
          const solicitud = {
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
          this.solicitudForm = <Expediente>solicitud;
        },
        error: (error:any) => {
          this.toastr.error(error.message);
        }
      });

      this.solicitudPersonaService.getExpedientePersona(this.id)
      .pipe(first())
      .subscribe({
        next: (data:any) => {
          const solicitud = {
            ...data.result,
            nombre_completo: [
              data.result?.nombres,
              data.result?.apellidos
            ].filter(Boolean)
              .join(" ")
          };
          this.solicitudPersonaForm = <ExpedientePersona>solicitud;
        },
        error: (error:any) => {
          this.toastr.error(error.message);
        }
      });

    }

  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
