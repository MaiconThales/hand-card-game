import { TestBed } from '@angular/core/testing';

import { InfoStorageService } from './info-storage.service';

describe('InfoStorageService', () => {
  let service: InfoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
