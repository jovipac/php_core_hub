import { TestBed } from '@angular/core/testing';

import { ExpendientePersonaService } from './expendiente-persona.service';

describe('ExpendientePersonaService', () => {
  let service: ExpendientePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpendientePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
