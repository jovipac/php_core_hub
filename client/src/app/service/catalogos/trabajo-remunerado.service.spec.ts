import { TestBed } from '@angular/core/testing';

import { TrabajoRemuneradoService } from './trabajo-remunerado.service';

describe('TrabajoRemuneradoService', () => {
  let service: TrabajoRemuneradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabajoRemuneradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
