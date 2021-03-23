import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditorModule } from '@tinymce/tinymce-angular';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SolicitudComponent } from './solicitud.component';
import { ExpedienteEncabezadoComponent } from '../components/expediente-encabezado/expediente-encabezado.component';
import { ExpedientePersonaComponent } from '../components/expediente-persona/expediente-persona.component';
import { ExpedienteHechoComponent } from '../components/expediente-hecho/expediente-hecho.component';
import { ExpedienteClasificacionComponent } from '../components/expediente-clasificacion/expediente-clasificacion.component';
import { ExpedienteDocumentoComponent } from '../components/expediente-documento/expediente-documento.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    SolicitudRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    TypeaheadModule,
    CarouselModule,
    BsDropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    FileUploadModule,
    ProgressbarModule,
    NgxSpinnerModule,
    EditorModule
  ],
  declarations: [
    SolicitudComponent,
    ExpedienteEncabezadoComponent,
    ExpedientePersonaComponent,
    ExpedienteHechoComponent,
    ExpedienteClasificacionComponent,
    ExpedienteDocumentoComponent
  ]
})
export class SolicitudModule { }
