import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteService} from '../../../service';
import { Visita } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  private id: string;
  isAddMode: boolean;
  public solicitudForm: Visita;

  constructor(
    private solicitudService: ExpedienteService,
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
            nombre_funcionario: [
              data.result?.nombres_funcionario,
              data.result?.apellidos_funcionario
            ].filter(Boolean)
            .join(" ")
          };
          this.solicitudForm = <Visita>solicitud;
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
