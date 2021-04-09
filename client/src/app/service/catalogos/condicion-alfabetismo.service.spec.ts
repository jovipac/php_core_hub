import { TestBed } from '@angular/core/testing';

import { CondicionAlfabetismoService } from './condicion-alfabetismo.service';

describe('CondicionAlfabetismoService', () => {
  let service: CondicionAlfabetismoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionAlfabetismoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
