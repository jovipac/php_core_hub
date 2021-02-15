import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitaRoutingModule } from './visita-routing.module';
import { VisitaComponent } from './visita.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        VisitaRoutingModule,
        SharedModule
    ],
    declarations: [VisitaComponent]
})
export class VisitaModule { }
