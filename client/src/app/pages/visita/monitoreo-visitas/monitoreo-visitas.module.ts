import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoVisitasRoutingModule } from './monitoreo-visitas-routing.module';
import { MonitoreoVisitasComponent } from './monitoreo-visitas.component';

@NgModule({
  declarations: [MonitoreoVisitasComponent],
  imports: [
    CommonModule,
    MonitoreoVisitasRoutingModule
  ]
})
export class MonitoreoVisitasModule { }
