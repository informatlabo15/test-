import { TestBed } from '@angular/core/testing';

import { AlertityService } from './alertity.service';

describe('AlertityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertityService = TestBed.get(AlertityService);
    expect(service).toBeTruthy();
  });
});
