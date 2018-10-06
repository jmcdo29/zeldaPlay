import { TestBed } from '@angular/core/testing';

import { SpellService } from './spell.service';

describe('SpellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpellService = TestBed.get(SpellService);
    expect(service).toBeTruthy();
  });
});
