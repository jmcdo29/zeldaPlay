import { inject, TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterService]
    });
  });

  it('should be created', inject(
    [CharacterService],
    (service: CharacterService) => {
      expect(service).toBeTruthy();
    }
  ));
});
