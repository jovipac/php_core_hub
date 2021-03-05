import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalBasicComponent, UiModalComponent, AnimationModalComponent],
  exports: [ModalBasicComponent, UiModalComponent, AnimationModalComponent]
})
export class ModalModule { }
