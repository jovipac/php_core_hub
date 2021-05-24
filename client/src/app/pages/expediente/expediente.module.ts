import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';

import { ExpedienteRoutingModule } from './expediente-routing.module';
import { ExpedienteComponent } from './expediente.component';
import { ExpedienteEncabezadoComponent } from './components/expediente-encabezado/expediente-encabezado.component';
import { ExpedientePersonaComponent } from './components/expediente-persona/expediente-persona.component';
import { ExpedienteHechoComponent } from './components/expediente-hecho/expediente-hecho.component';
import { ExpedienteClasificacionComponent } from './components/expediente-clasificacion/expediente-clasificacion.component';
import { ExpedienteDocumentoComponent } from './components/expediente-documento/expediente-documento.component';
import { ExpedienteDocumentoAdjuntoComponent } from './components/expediente-documento-adjunto/expediente-documento-adjunto.component';

@NgModule({
  declarations: [
    ExpedienteComponent,
    ExpedienteEncabezadoComponent,
    ExpedientePersonaComponent,
    ExpedienteHechoComponent,
    ExpedienteClasificacionComponent,
    ExpedienteDocumentoComponent,
    ExpedienteDocumentoAdjuntoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExpedienteRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ModalModule,
    TypeaheadModule,
    CarouselModule,
    NgSelectModule,
    BsDropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    FileUploadModule,
    ProgressbarModule,
    NgxSpinnerModule,
    EditorModule,
  ],
  exports: [
    ExpedienteEncabezadoComponent,
    ExpedientePersonaComponent,
    ExpedienteHechoComponent,
    ExpedienteClasificacionComponent,
    ExpedienteDocumentoComponent,
    ExpedienteDocumentoAdjuntoComponent
  ]
})
export class ExpedienteModule { }
