import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketVisitaRoutingModule } from './ticket-visita-routing.module';
import { TicketVisitaComponent } from './ticket-visita.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    NgxPrintModule,
    CommonModule,
    SharedModule,
    TicketVisitaRoutingModule,
  ],
  declarations: [TicketVisitaComponent]
})
export class TicketVisitaPageModule { }
