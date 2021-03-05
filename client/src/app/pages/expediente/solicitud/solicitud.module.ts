import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpedienteEncabezadoComponent } from '../components/expediente-encabezado/expediente-encabezado.component';
import { SolicitudComponent } from './solicitud.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SolicitudRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ExpedienteEncabezadoComponent, SolicitudComponent]
})
export class SolicitudModule { }
