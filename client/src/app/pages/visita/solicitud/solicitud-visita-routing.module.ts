import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudVisitaComponent} from './solicitud-visita.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agregar',
    pathMatch: 'full'
  },
  {
    path: 'agregar',
    component: SolicitudVisitaComponent,
    data: {
      breadcrumb: 'Recepción solicitud',
      icon: 'icofont icofont-file-document bg-c-blue',
      breadcrumb_caption: 'Visita',
      status: true
    }
  },
  { path: 'editar/:id',
    component: SolicitudVisitaComponent,
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
