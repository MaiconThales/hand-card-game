import { TestBed } from '@angular/core/testing';

import { LookForMathServiceService } from './look-for-math.service.service';

describe('LookForMathServiceService', () => {
  let service: LookForMathServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookForMathServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
