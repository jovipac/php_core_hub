import { TestBed } from '@angular/core/testing';

import { ExpedienteClasificacionDerechoService } from './expediente-clasificacion-derecho.service';

describe('ExpedienteClasificacionDerechoService', () => {
  let service: ExpedienteClasificacionDerechoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteClasificacionDerechoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
