import { TestBed } from '@angular/core/testing';

import { TipoAreaLugarService } from './tipo-area-lugar.service';

describe('TipoAreaLugarService', () => {
  let service: TipoAreaLugarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAreaLugarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
