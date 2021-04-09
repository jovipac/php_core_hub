import { TestBed } from '@angular/core/testing';

import { DiscapacidadPersonaService } from './discapacidad-persona.service';

describe('DiscapacidadPersonaService', () => {
  let service: DiscapacidadPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscapacidadPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
