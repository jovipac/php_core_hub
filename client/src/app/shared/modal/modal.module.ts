import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { BasicModalComponent } from './basic-modal/basic-modal.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BasicModalComponent, UiModalComponent, AnimationModalComponent],
  exports: [BasicModalComponent, UiModalComponent, AnimationModalComponent],
  providers: [
  ]
})
export class CustomModalModule { }
