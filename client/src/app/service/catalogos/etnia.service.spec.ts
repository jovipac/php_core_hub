import { TestBed } from '@angular/core/testing';

import { EtniaService } from './etnia.service';

describe('EtniaService', () => {
  let service: EtniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
