import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SolicitudRoutingModule
  ],
  declarations: [SolicitudComponent]
})
export class SolicitudModule { }
