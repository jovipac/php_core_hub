import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepwdRoutingModule } from './changepwd-routing.module';
import { ChangepwdComponent } from './changepwd.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({

  imports: [
    CommonModule,
    ChangepwdRoutingModule,
    BsDropdownModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    NgSelectModule
  ],
  bootstrap: [ChangepwdComponent],
  declarations: [ChangepwdComponent],
})
export class ChangepwdModule { }


/*
@NgModule({
  declarations: [ChangepwdComponent],
  imports: [
    CommonModule,
    ChangepwdRoutingModule
  ]
})
 */
