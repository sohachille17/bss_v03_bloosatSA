import { TestBed } from '@angular/core/testing';

import { LogsServicesService } from './logs-services.service';

describe('LogsServicesService', () => {
  let service: LogsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
