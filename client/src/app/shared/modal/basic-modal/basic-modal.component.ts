import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export class BasicModalComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  @Input() hideHeader = false;
  @Input() hideFooter = false;

  constructor() { }

  ngOnInit(): void {
  }

}
