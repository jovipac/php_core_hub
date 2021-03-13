import { TestBed } from '@angular/core/testing';

import { PersonaDireccionService } from './persona-direccion.service';

describe('PersonaDireccionService', () => {
  let service: PersonaDireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaDireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
