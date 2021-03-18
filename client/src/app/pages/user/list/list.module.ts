import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
        CommonModule,
        ListRoutingModule,
        BsDropdownModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(), // ToastrModule added
        NgxSpinnerModule

    ],
    bootstrap: [ListComponent],
    declarations: [ListComponent]
})
export class ListModule { }
