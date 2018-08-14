import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let characterService: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
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
