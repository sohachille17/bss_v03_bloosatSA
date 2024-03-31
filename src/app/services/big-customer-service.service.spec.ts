import { TestBed } from '@angular/core/testing';

import { BigCustomerServiceService } from './big-customer-service.service';

describe('BigCustomerServiceService', () => {
  let service: BigCustomerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigCustomerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
