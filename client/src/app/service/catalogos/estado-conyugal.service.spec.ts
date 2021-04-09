import { TestBed } from '@angular/core/testing';

import { EstadoConyugalService } from './estado-conyugal.service';

describe('EstadoConyugalService', () => {
  let service: EstadoConyugalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoConyugalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
