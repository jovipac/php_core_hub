import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedienteComponent } from './expediente.component';

const routes: Routes = [
  {
    path: '',
    component: ExpedienteComponent,
    data: {
      breadcrumb: 'Solicitud',
      icon: 'icofont icofont-folder-open bg-c-blue',
      status: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }
