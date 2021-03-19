import { TestBed } from '@angular/core/testing';

import { ExpedienteHechoArchivoService } from './expediente-hecho-archivo.service';

describe('ExpedienteHechoArchivoService', () => {
  let service: ExpedienteHechoArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteHechoArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
