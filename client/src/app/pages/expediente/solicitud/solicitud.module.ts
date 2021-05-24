import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { ExpedienteModule } from '../expediente.module';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SolicitudRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ModalModule,
    TypeaheadModule,
    CarouselModule,
    BsDropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    NgSelectModule,
    NgxSpinnerModule,
    ExpedienteModule
  ],
  declarations: [
    SolicitudComponent,
  ]
})
export class SolicitudModule { }
