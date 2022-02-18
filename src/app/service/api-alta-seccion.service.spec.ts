import { TestBed } from '@angular/core/testing';

import { ApiAltaSeccionService } from './api-alta-seccion.service';

describe('ApiAltaSeccionService', () => {
  let service: ApiAltaSeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAltaSeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
