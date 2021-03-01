import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudVisitaComponent } from './solicitud-visita.component';

describe('SolicitudVisitaComponent', () => {
  let component: SolicitudVisitaComponent;
  let fixture: ComponentFixture<SolicitudVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
