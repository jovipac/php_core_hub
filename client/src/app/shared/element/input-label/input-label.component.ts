import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'input-label',
  template: `<label for="{{id}}">{{label}} <span *ngIf="isRequired(requires)"> *</span></label>`,
  encapsulation: ViewEncapsulation.None
})
export class LabelInputComponent {
  @Input() label: string;
  @Input() id: string;
  @Input() requires: boolean;
  constructor() { }

  isRequired(value: boolean) {
    return this.requires;
  }
}
