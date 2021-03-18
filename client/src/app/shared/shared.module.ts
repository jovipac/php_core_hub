import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { ToggleFullScreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { CardRefreshDirective } from './card/card-refresh.directive';
import { CardToggleDirective } from './card/card-toggle.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardModule } from './card/card.module';
import { CustomModalModule } from './modal/modal.module';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { LabelInputComponent } from './element/input-label/input-label.component';
import { DataFilterPipe } from './element/data-filter.pipe';
import { MenuItems } from './menu-items/menu-items';
import { ParentRemoveDirective } from './element/parent-remove.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { InlineClockComponent } from './element/inline-clock/inline-clock.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    CardModule,
    CustomModalModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullScreenDirective,
    CardRefreshDirective,
    CardToggleDirective,
    SpinnerComponent,
    ModalAnimationComponent,
    LabelInputComponent,
    InlineClockComponent,
    DataFilterPipe,
    ParentRemoveDirective,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullScreenDirective,
    CardRefreshDirective,
    CardToggleDirective,
    SpinnerComponent,
    CardModule,
    CustomModalModule,
    ModalAnimationComponent,
    LabelInputComponent,
    InlineClockComponent,
    DataFilterPipe,
    ParentRemoveDirective,
    PerfectScrollbarModule,
    ClickOutsideModule
  ],
  providers: [
    MenuItems,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
