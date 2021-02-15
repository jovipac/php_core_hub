import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVisitaRoutingModule } from './solicitud-visita-routing.module';
import { SolicitudVisitaComponent } from './solicitud-visita.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SolicitudVisitaRoutingModule,
    SharedModule
  ],
  declarations: [SolicitudVisitaComponent]
})
export class SolicitudVisitaPageModule { }
