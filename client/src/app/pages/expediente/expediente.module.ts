import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpedienteRoutingModule } from './expediente-routing.module';
import { ExpedienteComponent } from './expediente.component';


@NgModule({
  declarations: [ExpedienteComponent],
  imports: [
    CommonModule,
    ExpedienteRoutingModule
  ]
})
export class ExpedienteModule { }
