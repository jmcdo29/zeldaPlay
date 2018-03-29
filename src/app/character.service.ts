import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Character } from './Character/character';
import { CHARACTERS } from './mock-character';

@Injectable()
export class CharacterService {

  constructor() { }

  getCharacters(): Observable<Character[]> {
    return of(CHARACTERS);
  }
}
