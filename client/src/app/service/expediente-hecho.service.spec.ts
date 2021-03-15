import { TestBed } from '@angular/core/testing';

import { ExpedienteHechoService } from './expediente-hecho.service';

describe('ExpedienteHechoService', () => {
  let service: ExpedienteHechoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteHechoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
