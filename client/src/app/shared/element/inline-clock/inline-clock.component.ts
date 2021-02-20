import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'inline-clock',
  templateUrl: './inline-clock.component.html',
  styleUrls: ['./inline-clock.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineClockComponent),
      multi: true
    }
  ]
})
export class InlineClockComponent implements OnInit, OnDestroy {
  public time = new Date();
  private timer;

  @Input() myLabel: string = '';
  counter: number = 0;

  constructor() { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
