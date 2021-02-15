import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVisitaRoutingModule } from './solicitud-visita-routing.module';
import { SolicitudVisitaComponent } from './solicitud-visita.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SolicitudVisitaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SolicitudVisitaComponent]
})
export class SolicitudVisitaPageModule { }
