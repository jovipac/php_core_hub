import { TestBed } from '@angular/core/testing';

import { ComunidadLinguisticaService } from './comunidad-linguistica.service';

describe('ComunidadLinguisticaService', () => {
  let service: ComunidadLinguisticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunidadLinguisticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
