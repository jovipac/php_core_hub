import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintanceProfileRoutingModule } from './maintance-profile-routing.module';
import { MaintanceProfileComponent } from './maintance-profile.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
    imports: [
        CommonModule,
        MaintanceProfileRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(), // ToastrModule added
        NgxSpinnerModule
    ],
    declarations: [MaintanceProfileComponent]
})
export class MaintanceProfileModule { }
