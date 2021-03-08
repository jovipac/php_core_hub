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
  public solicitud: Expediente;
  public solicitudPersonas: Array<ExpedientePersona>;

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
        },
        error: (error:any) => {
          this.toastr.error(error.message);
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

  goEditExpedientePerson(expediente) {
    this.router.navigate(['../../editar',
      expediente.id_expediente_persona],
      { relativeTo: this.route }
    );
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
