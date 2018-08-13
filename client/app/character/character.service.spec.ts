import { inject, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { CharacterService } from './character.service';

describe('CharacterService', () => {

  let characterService: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [CharacterService]
    });
    characterService = TestBed.get(CharacterService);
  });

  it('should be created', inject(
    [CharacterService],
    (service: CharacterService) => {
      expect(service).toBeTruthy();
    }
  ));
});
