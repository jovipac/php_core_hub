import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss'],
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
