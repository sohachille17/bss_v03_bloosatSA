import { TestBed } from '@angular/core/testing';

import { BlooServiceService } from './bloo-service.service';

describe('BlooServiceService', () => {
  let service: BlooServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlooServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
