import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintanceProfileComponent } from './maintance-profile.component';

const routes: Routes = [
    {
        path: '',
        component: MaintanceProfileComponent,
        data: {
            breadcrumb: 'Mantenimiento de perfiles',
            icon: 'icofont-justify-all bg-c-green',
            breadcrumb_caption: 'Mantenimiento de perfiles',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintanceProfileRoutingModule { }
