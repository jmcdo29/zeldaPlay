import { TestBed } from '@angular/core/testing';

import { SaveService } from './save.service';

describe('SaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveService = TestBed.get(SaveService);
    expect(service).toBeTruthy();
  });
});
