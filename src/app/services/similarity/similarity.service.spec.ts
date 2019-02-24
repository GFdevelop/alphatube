import { TestBed } from '@angular/core/testing';

import { SimilarityService } from './similarity.service';

describe('SimilarityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimilarityService = TestBed.get(SimilarityService);
    expect(service).toBeTruthy();
  });
});
