import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";

import { AllTemplateComponent } from './plantilla-documento/all/all.component';
import { CreateTemplateComponent } from './plantilla-documento/create/create.component';
import { EditTemplateComponent } from './plantilla-documento/edit/edit.component';
import { ShowTemplateComponent } from './plantilla-documento/show/show.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EditorModule,
    NgSelectModule,
    BsDropdownModule,
    BsDatepickerModule,
    NgxSpinnerModule,
  ],
  declarations: [
    ConfigComponent,
    AllTemplateComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    ShowTemplateComponent
  ],
})
export class ConfigModule { }
