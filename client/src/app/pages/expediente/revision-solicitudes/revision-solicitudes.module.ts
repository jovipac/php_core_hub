import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
import { RevisionSolicitudesRoutingModule } from './revision-solicitudes-routing.module';
import { RevisionSolicitudesComponent } from './revision-solicitudes.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BsDropdownModule,
    NgxSpinnerModule,
    RevisionSolicitudesRoutingModule
  ],
  bootstrap: [RevisionSolicitudesComponent],
  declarations: [RevisionSolicitudesComponent],
})
export class RevisionSolicitudesModule { }
