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
export class InlineClockComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() format: string = 'hh:mm:ss a';
  @Input() value: Date;
  @Input() id: string;

  public time: Date;
  private isPaused: boolean;
  private timer;

  constructor() {
    this.resetTimer();
  }

  ngOnInit() {
    this.timer = setInterval(() => this.tick(), 1000);
    /*
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
    */
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  writeValue(value: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState(isDisabled: boolean): void { }

  private tick(): void {
    if (!this.isPaused) {
      this.time = new Date();
    } else {
      this.setTimer(this.value);
    }
  }

  public resetTimer() {
    this.isPaused = false;
    this.time = new Date();
  }

  public setTimer(value: Date) {
    this.isPaused = true;
    this.time = new Date(value);
  }

}
