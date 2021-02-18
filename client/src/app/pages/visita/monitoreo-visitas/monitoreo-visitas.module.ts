import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoVisitasRoutingModule } from './monitoreo-visitas-routing.module';
import { MonitoreoVisitasComponent } from './monitoreo-visitas.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MonitoreoVisitasComponent],
  imports: [
    CommonModule,
    MonitoreoVisitasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,    
  ]
})
export class MonitoreoVisitasModule { }
