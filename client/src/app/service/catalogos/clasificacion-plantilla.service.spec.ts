import { TestBed } from '@angular/core/testing';

import { ClasificacionPlantillaService } from './clasificacion-plantilla.service';

describe('ClasificacionPlantillaService', () => {
  let service: ClasificacionPlantillaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionPlantillaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
