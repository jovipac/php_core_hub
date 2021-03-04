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
      breadcrumb: 'Nueva',
      icon: 'icofont icofont-folder-open bg-c-blue',
      breadcrumb_caption: 'Solicitud',
      status: true
    }
  },
  {
    path: 'editar/:id',
    component: SolicitudComponent,
    data: {
      breadcrumb: 'Actualizar',
      icon: 'icofont icofont-folder-open bg-c-blue',
      breadcrumb_caption: 'Solicitud',
      status: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
