import { TestBed } from '@angular/core/testing';

import { DbpediaService } from './dbpedia.service';

describe('DbpediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbpediaService = TestBed.get(DbpediaService);
    expect(service).toBeTruthy();
  });
});
