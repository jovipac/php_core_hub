import { TestBed } from '@angular/core/testing';

import { AuxiliaturaService } from './auxiliatura.service';

describe('AuxiliaturaService', () => {
  let service: AuxiliaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuxiliaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
