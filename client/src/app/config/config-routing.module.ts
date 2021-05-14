import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';
import { AllTemplateComponent, CreateTemplateComponent, EditTemplateComponent, ShowTemplateComponent } from './plantilla-documento/index';

const routes: Routes = [
  {
    path: 'plantilla-documento',
    //component: ConfigComponent,
    data: {
      breadcrumb: 'Configuración',
      icon: 'icofont icofont-folder bg-c-blue',
      status: true
    },
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      {
        path: 'all',
        children: [
          { path: '', component: AllTemplateComponent },
          { path: ':page_no', component: AllTemplateComponent },
        ]
      },
      { path: 'create', component: CreateTemplateComponent },
      { path: 'edit/:id', component: EditTemplateComponent },
      { path: 'show/:id', component: ShowTemplateComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
