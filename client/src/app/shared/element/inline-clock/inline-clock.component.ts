import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'inline-clock',
  templateUrl: './inline-clock.component.html',
  styleUrls: ['./inline-clock.component.scss']
})
export class InlineClockComponent implements OnInit, OnDestroy {
  public time = new Date();
  private timer;

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
