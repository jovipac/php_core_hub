import { TestBed } from '@angular/core/testing';

import { ExpedientePersonaService } from './expediente-persona.service';

describe('ExpedientePersonaService', () => {
  let service: ExpedientePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedientePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
