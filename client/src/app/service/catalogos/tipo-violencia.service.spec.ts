import { TestBed } from '@angular/core/testing';

import { TipoViolenciaService } from './tipo-violencia.service';

describe('TipoViolenciaService', () => {
  let service: TipoViolenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoViolenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
