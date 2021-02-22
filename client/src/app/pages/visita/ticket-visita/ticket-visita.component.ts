import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitasService} from '../../../service';
import { Visita } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-visita',
  templateUrl: './ticket-visita.component.html',
  styleUrls: ['./ticket-visita.component.scss']
})
export class TicketVisitaComponent implements OnInit {
  private id: string;
  public visitaForm: Visita;

  constructor(
    private visitaService: VisitasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.visitaService.getVisit(this.id)
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const ticket = data.result;
        this.visitaForm = <Visita>ticket;
      },
      error: (error:any) => {
        this.toastr.error(error.message);
      }
    });

  }

  onNew() {
    this.router.navigate(['/visita/solicitud/agregar'], { relativeTo: this.route });
  }

}
