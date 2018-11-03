import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Magics } from '#Enums/magic-skills.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { environment } from '#Environment/environment';
import { Character } from '#Models/character';
import { ICharacterQuery } from '#Models/character.db';
import { MessageService } from '#Shared/messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterUrl = environment.apiUrl + '/character/';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<ICharacterQuery[]>(this.characterUrl).pipe(
      map<ICharacterQuery[], Character[]>((ch) => {
        const characters = [];
        for (const response of ch) {
          response.skills = [];
          response.saves = [];
          characters.push(new Character(null, response as any));
        }
        const outcome = `Got ${ch.length} character.`;
        this.messageService.add(outcome);
        return characters;
      }),
      catchError(this.handleError('get characters', []))
    );
  }

  getCharacter(id): Observable<Character> {
    return this.httpClient.get<ICharacterQuery>(this.characterUrl + id).pipe(
      map<ICharacterQuery, Character>((response) => {
        const character = new Character(null, response);
        return character;
      }),
      catchError(this.handleError('get character', null))
    );
  }

  getUserCharacters(userId): Observable<Character[]> {
    return this.httpClient
      .get<ICharacterQuery[]>(this.characterUrl + 'user/' + userId, {
        headers: {
          authorization: 'bearer ' + sessionStorage.getItem('userToken')
        },
        withCredentials: true
      })
      .pipe(
        map<ICharacterQuery[], Character[]>((ch) => {
          const characters = [];
          for (const response of ch) {
            // these arrays are just to make the constructor work properly and have no other purpose
            response.skills = [];
            response.saves = [];
            characters.push(new Character(null, response as any));
          }
          const outcome = `Got ${ch.length} character.`;
          this.messageService.add(outcome);
          return characters;
        }),
        catchError(this.handleError('get characters', []))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.message);
      const errMsg =
        'ERROR IN ' + operation.toUpperCase() + ': ' + error.message;
      this.messageService.add(errMsg);
      return of(result as T);
    };
  }

  saveCharCopy(character: Character): void {
    const characterString = JSON.stringify(character);
    const blob = new Blob([characterString], {
      type: 'application/json'
    });
    FileSaver.saveAs(blob, character.name + '_zeldaplay.json');
  }

  saveNewCharDb(character: Character): Observable<Character> {
    const userId = sessionStorage.getItem('currentUser');
    return this.httpClient
      .post<ICharacterQuery>(
        this.characterUrl + `new/${userId}`,
        {
          character
        },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((characterRes) => {
          character.id = characterRes.id;
          for (const skill of characterRes.skills) {
            if (skill.skill_type === 'skill') {
              character.skills[Skills[skill.name]].id = skill.id;
            } else if (skill.skill_type === 'weapon') {
              character.weaponSkills[Weapons[skill.name]].id = skill.id;
            } else {
              character.magicSkills[Magics[skill.name]].id = skill.id;
            }
          }
          for (const save of characterRes.saves) {
            character.savingThrows[
              findObjectPartial(character.savingThrows, 'name', save.name)
            ].id = save.id;
          }
          return character;
        })
      );
  }

  saveUpdateCharDb(character: Character): Observable<Character> {
    return this.httpClient
      .post<ICharacterQuery>(
        this.characterUrl + `update/${character.id}`,
        { character },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(map(() => character));
  }
}

function findObjectPartial(array: any[], key: string, value: string): number {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
}
