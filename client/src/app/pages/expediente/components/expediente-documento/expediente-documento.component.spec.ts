import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteDocumentoComponent } from './expediente-documento.component';

describe('ExpedienteDocumentoComponent', () => {
  let component: ExpedienteDocumentoComponent;
  let fixture: ComponentFixture<ExpedienteDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
