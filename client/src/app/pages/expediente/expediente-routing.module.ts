import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Expediente',
      icon: 'icofont icofont-folder bg-c-blue',
      status: true
    },
    children: [
      {
        path: 'solicitud',
        loadChildren: () => import('./solicitud/solicitud.module').then(m => m.SolicitudModule)
      },
      {
        path: 'revision-solicitud',
        loadChildren: () => import('./revision-solicitudes/revision-solicitudes.module').then(m => m.RevisionSolicitudesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }
