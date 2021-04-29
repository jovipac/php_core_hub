import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        data: {
            breadcrumb: 'Mantenimiento de usuarios',
            icon: 'icofont-user bg-c-blue',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRoutingModule { }
