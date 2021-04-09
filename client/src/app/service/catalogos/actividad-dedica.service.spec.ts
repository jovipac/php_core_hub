import { TestBed } from '@angular/core/testing';

import { ActividadDedicaService } from './actividad-dedica.service';

describe('ActividadDedicaService', () => {
  let service: ActividadDedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadDedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
