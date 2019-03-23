import { Injectable } from '@nestjs/common';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { DbCharacter } from '@DbModel/index';
import { DbCharacterService } from './db-character/db-character.service';

@Injectable()
export class CharacterService {
  constructor(private readonly dbService: DbCharacterService) {
    console.log('Character service constructed');
  }

  getAll(): Observable<DbCharacter[]> {
    return this.dbService.queryCharacters(process.env.DUMMY_ID);
  }

  getOne(charId: string): Observable<DbCharacter> {
    return this.dbService.queryCharacterOne(charId);
  }

  getUserChars(userId: string): Observable<DbCharacter[]> {
    return this.dbService.queryCharacters(userId);
  }

  newChar(inChar: DbCharacter, userId: string): Observable<DbCharacter> {
    return this.dbService.insertNewCharacter(inChar, userId);
  }

  updateChar(inChar: DbCharacter): Observable<DbCharacter> {
    return zip(
      this.dbService.updateCharacter(inChar),
      this.dbService.updateSkills(inChar.skills, inChar.chId)
    ).pipe(
      map((result) => {
        return result[0];
      })
    );
  }
}
