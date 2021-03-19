import { TestBed } from '@angular/core/testing';

import { ClasificacionDerechoService } from './clasificacion-derecho.service';

describe('ClasificacionDerechoService', () => {
  let service: ClasificacionDerechoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionDerechoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
