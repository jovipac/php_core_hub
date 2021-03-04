import { TestBed } from '@angular/core/testing';

import { TipoVinculacionService } from './tipo-vinculacion.service';

describe('TipoVinculacionService', () => {
  let service: TipoVinculacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoVinculacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
