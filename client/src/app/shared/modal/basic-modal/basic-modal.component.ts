import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit {
  @Input() hideHeader = false;
  @Input() hideFooter = false;

  constructor() { }

  ngOnInit(): void {
  }

}
