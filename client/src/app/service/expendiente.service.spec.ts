import { TestBed } from '@angular/core/testing';

import { ExpendienteService } from './expendiente.service';

describe('ExpendienteService', () => {
  let service: ExpendienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpendienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
