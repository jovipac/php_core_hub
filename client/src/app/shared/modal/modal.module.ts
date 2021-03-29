import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { BasicModalComponent } from './basic-modal/basic-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [BasicModalComponent, UiModalComponent, AnimationModalComponent],
  exports: [BasicModalComponent, UiModalComponent, AnimationModalComponent],
  providers: [
  ]
})
export class CustomModalModule { }
