import { TestBed } from '@angular/core/testing';

import { ExpedienteDocumentoService } from './expediente-documento.service';

describe('ExpedienteDocumentoService', () => {
  let service: ExpedienteDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
