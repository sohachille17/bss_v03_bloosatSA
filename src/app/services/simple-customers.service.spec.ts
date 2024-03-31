import { TestBed } from '@angular/core/testing';

import { SimpleCustomersService } from './simple-customers.service';

describe('SimpleCustomersService', () => {
  let service: SimpleCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
