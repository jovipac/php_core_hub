import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicLoginRoutingModule } from './basic-login-routing.module';
import { BasicLoginComponent } from './basic-login.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [BasicLoginComponent]
})
export class BasicLoginModule { }
