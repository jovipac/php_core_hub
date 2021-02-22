import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVisitaComponent } from './ticket-visita.component';

describe('TicketVisitaComponent', () => {
  let component: TicketVisitaComponent;
  let fixture: ComponentFixture<TicketVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
