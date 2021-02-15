import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoVisitasComponent } from './monitoreo-visitas.component';

describe('MonitoreoVisitasComponent', () => {
  let component: MonitoreoVisitasComponent;
  let fixture: ComponentFixture<MonitoreoVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoreoVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoreoVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
