import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteEncabezadoComponent } from './expediente-encabezado.component';

describe('ExpedienteEncabezadoComponent', () => {
  let component: ExpedienteEncabezadoComponent;
  let fixture: ComponentFixture<ExpedienteEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
