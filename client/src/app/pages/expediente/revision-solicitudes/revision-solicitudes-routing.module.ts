import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevisionSolicitudesComponent } from './revision-solicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: RevisionSolicitudesComponent,
    data: {
        breadcrumb: 'Revisión de solicitudes',
        icon: 'icofont-layout bg-c-blue',
        status: true
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionSolicitudesRoutingModule { }
