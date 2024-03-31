import { TestBed } from '@angular/core/testing';

import { BigSubscriptionService } from './big-subscription.service';

describe('BigSubscriptionService', () => {
  let service: BigSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
