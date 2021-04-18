import { TestBed } from '@angular/core/testing';

import { ExpedienteDocumentoArchivoService } from './expediente-documento-archivo.service';

describe('ExpedienteDocumentoArchivoService', () => {
  let service: ExpedienteDocumentoArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteDocumentoArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
