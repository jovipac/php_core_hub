import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteClasificacionComponent } from './expediente-clasificacion.component';

describe('ExpedienteClasificacionComponent', () => {
  let component: ExpedienteClasificacionComponent;
  let fixture: ComponentFixture<ExpedienteClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteClasificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
