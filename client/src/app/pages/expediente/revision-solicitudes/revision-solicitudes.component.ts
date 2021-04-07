import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService } from '../../../service';
import { Expediente } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { isEmptyValue } from '../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-revision-solicitudes',
  templateUrl: './revision-solicitudes.component.html',
  styleUrls: ['./revision-solicitudes.component.scss']
})
export class RevisionSolicitudesComponent implements OnInit {
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
    this.listExpediente();
  }

  listExpediente() {
    this.solicitudService.getListExpediente()
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const expedientesFormateadas = data.result
        ? data.result.map((data:any) => {
          const expediente = {
          ...data,
          correlativo: formatearCorrelativo(
            null, data.anio, data.folio),
          nombre_funcionario: [
            data?.nombres_funcionario,
            data?.apellidos_funcionario
          ].filter(Boolean)
            .join(" ")
          };
          return <Expediente>expediente;
      }) : [];
        this.listSolicitudes = expedientesFormateadas;
        console.log(this.listSolicitudes);
      },
      error: (error:any) => {
        this.toastr.error(error.message);
        this.loading.hide('dashboard');
      }
    });
  }

}
