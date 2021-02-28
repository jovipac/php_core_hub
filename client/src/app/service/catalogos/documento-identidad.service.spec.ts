import { TestBed } from '@angular/core/testing';

import { DocumentoIdentidadService } from './documento-identidad.service';

describe('DocumentoIdentidadService', () => {
  let service: DocumentoIdentidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoIdentidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
