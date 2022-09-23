import { TestBed } from '@angular/core/testing';

import { GeoOperationsService } from './geo-operations.service';

describe('GeoOperationsService', () => {
  let service: GeoOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
