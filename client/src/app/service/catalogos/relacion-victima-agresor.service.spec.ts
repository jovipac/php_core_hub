import { TestBed } from '@angular/core/testing';

import { RelacionVictimaAgresorService } from './relacion-victima-agresor.service';

describe('RelacionVictimaAgresorService', () => {
  let service: RelacionVictimaAgresorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionVictimaAgresorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
