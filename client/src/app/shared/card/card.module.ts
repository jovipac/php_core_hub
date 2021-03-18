import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { BsDropdownModule  } from 'ngx-bootstrap/dropdown';
/*import { AnimationService, AnimatorModule } from 'css-animator';*/

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
    /*AnimatorModule*/
  ],
  declarations: [CardComponent],
  exports: [CardComponent],
  providers: [/*AnimationService*/]
})
export class CardModule { }
