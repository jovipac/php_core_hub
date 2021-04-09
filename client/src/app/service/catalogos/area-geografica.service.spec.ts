import { TestBed } from '@angular/core/testing';

import { AreaGeograficaService } from './area-geografica.service';

describe('AreaGeograficaService', () => {
  let service: AreaGeograficaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaGeograficaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
