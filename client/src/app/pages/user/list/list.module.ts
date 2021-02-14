import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        ListRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(), // ToastrModule added

    ],
    bootstrap: [ListComponent],
    declarations: [ListComponent]
})
export class ListModule { }
