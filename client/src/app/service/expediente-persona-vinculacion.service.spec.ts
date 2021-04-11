import { TestBed } from '@angular/core/testing';

import { ExpedientePersonaVinculacionService } from './expediente-persona-vinculacion.service';

describe('ExpedientePersonaVinculacionService', () => {
  let service: ExpedientePersonaVinculacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedientePersonaVinculacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
