import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nuevo',
    pathMatch: 'full'
  },
  {
    path: 'nuevo',
    component: SolicitudComponent,
    data: {
      breadcrumb: 'Recepción solicitud',
      icon: 'icofont icofont-folder-open bg-c-blue',
      breadcrumb_caption: 'Visita',
      status: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
