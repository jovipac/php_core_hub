import { TestBed } from '@angular/core/testing';

import { TipoDireccionService } from './tipo-direccion.service';

describe('TipoDireccionService', () => {
  let service: TipoDireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
