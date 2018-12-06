import { TestBed } from '@angular/core/testing';

import { FvitaliService } from './fvitali.service';

describe('FvitaliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FvitaliService = TestBed.get(FvitaliService);
    expect(service).toBeTruthy();
  });
});
