import { TestBed } from '@angular/core/testing';

import { ExpedienteComentarioService } from './expediente-comentario.service';

describe('ExpedienteComentarioService', () => {
  let service: ExpedienteComentarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteComentarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
