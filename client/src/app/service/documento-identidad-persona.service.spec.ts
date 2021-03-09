import { TestBed } from '@angular/core/testing';

import { DocumentoIdentidadPersonaService } from './documento-identidad-persona.service';

describe('DocumentoIdentidadPersonaService', () => {
  let service: DocumentoIdentidadPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoIdentidadPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
