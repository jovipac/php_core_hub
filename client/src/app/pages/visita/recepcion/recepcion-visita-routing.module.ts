import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecepcionVisitaComponent} from './recepcion-visita.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agregar',
    pathMatch: 'full'
  },
  {
    path: 'agregar',
    component: RecepcionVisitaComponent,
    data: {
      breadcrumb: 'Recepción solicitud',
      icon: 'icofont icofont-file-document bg-c-blue',
      breadcrumb_caption: 'Visita',
      status: true
    }
  },
  { path: 'editar/:id',
    component: RecepcionVisitaComponent,
    data: {
      breadcrumb: 'Recepción solicitud',
      icon: 'icofont icofont-file-document bg-c-blue',
      breadcrumb_caption: 'Visita',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudVisitaRoutingModule { }