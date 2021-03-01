import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Visita',
            icon: 'icofont icofont-users-alt-5 bg-c-blue',
            breadcrumb_caption: 'Recepcion',
            status: true
        },
        children: [
            {
                path: 'solicitud',
                loadChildren: () => import('./recepcion/solicitud-visita.module').then(m => m.SolicitudVisitaPageModule)
            },
            {
              path: 'monitoreo-visitas',
              loadChildren: () => import('./monitoreo-visitas/monitoreo-visitas.module').then(m => m.MonitoreoVisitasModule)
            },
            {
              path: 'ticket',
              loadChildren: () => import('./ticket-visita/ticket-visita.module').then(m => m.TicketVisitaPageModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitaRoutingModule { }
