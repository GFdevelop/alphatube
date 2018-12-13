import { TestBed } from '@angular/core/testing';

import { AlphalistService } from './alphalist.service';

describe('AlphalistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphalistService = TestBed.get(AlphalistService);
    expect(service).toBeTruthy();
  });
});
