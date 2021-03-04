import { TestBed } from '@angular/core/testing';

import { ExpedienteService } from './expendiente.service';

describe('ExpedienteService', () => {
  let service: ExpedienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
