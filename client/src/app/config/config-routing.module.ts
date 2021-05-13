import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';
import { PlantillaDocumentoComponent } from './components/plantilla-documento/plantilla-documento.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    data: {
      breadcrumb: 'Configuración',
      icon: 'icofont icofont-folder bg-c-blue',
      status: true
    },
    children: [
      { path: 'plantilla-documento', component: PlantillaDocumentoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
