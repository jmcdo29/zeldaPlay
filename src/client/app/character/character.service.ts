import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { Character } from '#Models/character';
import { ICharacterQuery } from '#Models/character.db';
import { AbstractService } from '#Shared/abstract.service';
import { MessageService } from '#Shared/messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends AbstractService {
  private characterUrl = environment.apiUrl + '/character';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    super();
  }

  /**
   * Generic call to the server to get all demo characters
   */
  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<ICharacterQuery[]>(this.characterUrl).pipe(
      this.mapChar(),
      catchError(this.handleError('get characters', []))
    );
  }

  /**
   * Function to retrieve information about one character.
   * Retrieves skills, saves, and general stats
   * @param id the id of the character to retrieve
   */
  getCharacter(id: string): Observable<Character> {
    return this.httpClient
      .get<ICharacterQuery>(this.characterUrl + '/' + id)
      .pipe(
        map<ICharacterQuery, Character>((response) => {
          return new Character(null, response);
        }),
        catchError(this.handleError('get character', null))
      );
  }

  /**
   * Function to get names, races, and ids of all current user characters
   * @param userId The currently logged in user
   */
  getUserCharacters(userId: string): Observable<Character[]> {
    return this.httpClient
      .get<ICharacterQuery[]>(this.characterUrl + '/user/' + userId, {
        headers: {
          authorization: 'bearer ' + sessionStorage.getItem('userToken')
        },
        withCredentials: true
      })
      .pipe(
        this.mapChar(),
        catchError(this.handleError('get characters', []))
      );
  }

  /**
   * Function to save character as a JSON file
   * @param character The current character
   */
  saveCharCopy(character: Character): void {
    const characterString = JSON.stringify(character);
    const blob = new Blob([characterString], {
      type: 'application/json'
    });
    FileSaver.saveAs(blob, character.name + '_zeldaplay.json');
  }

  /**
   * Function to save the current character to the database. This is called only on initial save
   * @param character Current character
   */
  saveNewCharDb(character: Character): Observable<Character> {
    const userId = sessionStorage.getItem('currentUser');
    const charReq = this.transform(character);
    return this.httpClient
      .post<ICharacterQuery>(
        this.characterUrl + `/new/${userId}`,
        {
          character: charReq
        },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((characterRes) => {
          character.id = characterRes.chId;
          return character;
        }),
        catchError(this.handleError<Character>('save character', character))
      );
  }

  /**
   * Function to save the updated character to the database after all updates have finished
   * @param character Current Character
   */
  saveUpdateCharDb(character: Character): Observable<Character> {
    const charReq = this.transform(character);
    return this.httpClient
      .patch<ICharacterQuery>(
        this.characterUrl + `/update/${character.id}`,
        { character: charReq },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map(() => character),
        catchError(this.handleError<Character>('update character', character))
      );
  }

  /**
   * Internal operator function for reusablity in Observable pipes.
   * Maps the Server character response to the character object
   */
  mapChar(): OperatorFunction<ICharacterQuery[], Character[]> {
    return map<ICharacterQuery[], Character[]>((ch) => {
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
    });
  }

  /**
   * Function that allows graceful handling of observable errors
   * @param operation The operation that failed
   * @param result What should be returned instead of the requested object
   */
  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.message);
      const errMsg =
        'ERROR IN ' + operation.toUpperCase() + ': ' + error.message;
      this.messageService.add(errMsg);
      return of(result);
    };
  }
}
