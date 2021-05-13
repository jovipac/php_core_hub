import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ConfigRoutingModule } from './config-routing.module';
import { PlantillaDocumentoComponent } from './components/plantilla-documento/plantilla-documento.component';
import { ConfigComponent } from './config.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule
  ],
  declarations: [
    ConfigComponent,
    PlantillaDocumentoComponent
  ],
})
export class ConfigModule { }
