import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoreoVisitasComponent } from './monitoreo-visitas.component';

const routes: Routes = [

  {
    path: ':id',
    component: MonitoreoVisitasComponent,
    data: {
      breadcrumb: 'Monitor de atención',
      icon: 'icofont icofont-file-document bg-c-blue',
      breadcrumb_caption: 'Listado',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoreoVisitasRoutingModule { }
