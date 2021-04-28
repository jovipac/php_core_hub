import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepwdComponent } from './changepwd.component';

const routes: Routes = [
  { 
    path: '', 
    component: ChangepwdComponent,
    data: {
      breadcrumb: 'Cambiar Clave',
      icon: 'icofont-user bg-c-blue',
      status: true
  }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangepwdRoutingModule { }
