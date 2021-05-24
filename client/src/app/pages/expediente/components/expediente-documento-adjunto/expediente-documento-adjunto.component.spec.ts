import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteDocumentoAdjuntoComponent } from './expediente-documento-adjunto.component';

describe('ExpedienteDocumentoAdjuntoComponent', () => {
  let component: ExpedienteDocumentoAdjuntoComponent;
  let fixture: ComponentFixture<ExpedienteDocumentoAdjuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteDocumentoAdjuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteDocumentoAdjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
