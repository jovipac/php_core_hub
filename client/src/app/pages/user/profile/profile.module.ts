import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TabsModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
