import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudVisitaRoutingModule } from './recepcion-visita-routing.module';
import { RecepcionVisitaComponent } from './recepcion-visita.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SolicitudVisitaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [RecepcionVisitaComponent]
})
export class RecepcionVisitaPageModule { }
