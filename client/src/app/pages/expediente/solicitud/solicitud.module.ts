import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SolicitudComponent } from './solicitud.component';
import { ExpedienteEncabezadoComponent } from '../components/expediente-encabezado/expediente-encabezado.component';
import { ExpedientePersonaComponent } from '../components/expediente-persona/expediente-persona.component';
import { ExpedienteHechoComponent } from '../components/expediente-hecho/expediente-hecho.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    SolicitudRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SolicitudComponent,
    ExpedienteEncabezadoComponent,
    ExpedientePersonaComponent,
    ExpedienteHechoComponent
  ]
})
export class SolicitudModule { }
