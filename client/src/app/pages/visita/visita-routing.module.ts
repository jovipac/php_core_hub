import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Visita',
            status: false
        },
        children: [
            {
                path: 'solicitud',
                loadChildren: () => import('./solicitud/solicitud-visita.module').then(m => m.SolicitudVisitaPageModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitaRoutingModule { }
