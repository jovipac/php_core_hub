import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketVisitaComponent } from './ticket-visita.component';

const routes: Routes = [
  {
    path: ':id',
    component: TicketVisitaComponent,
    data: {
      breadcrumb: 'Ticket',
      icon: 'icofont icofont-file-document bg-c-blue',
      breadcrumb_caption: 'Impresión',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketVisitaRoutingModule { }
