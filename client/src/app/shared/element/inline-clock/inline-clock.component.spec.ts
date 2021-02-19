import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineClockComponent } from './inline-clock.component';

describe('InlineClockComponent', () => {
  let component: InlineClockComponent;
  let fixture: ComponentFixture<InlineClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
