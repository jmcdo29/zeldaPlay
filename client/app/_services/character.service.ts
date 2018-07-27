import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

import { Character } from '../_models/character';

import * as FileSaver from 'file-saver';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterUrl = environment.apiUrl + '/api/characters';

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getCharacters(id?: string): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.characterUrl)
    .pipe(
      tap(ch => {
        console.log(ch);
        const outcome = ch ? 'Got characters' : 'Found a problem';
        this.messageService.add(outcome);
      }),
      catchError(this.handleError('get characters', []))
    );
  }

  getCharacter(id): Observable<Character> {
    return this.httpClient.get<any>(this.characterUrl + '/' + id).pipe(
      map(response => {
        console.log('RESPONSE');
        console.log(response);
        console.log(response instanceof Character);
        const character = new Character(null, response);
        return character;
      }),
      catchError(this.handleError('get character', null))
    );
  }

  getUserCharacters(userId): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.characterUrl + '/user/' + userId);
  }

  private handleError<T> (operation: String, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      const errMsg = 'ERROR IN ' + operation.toUpperCase() + ': ' + error.message;
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

  saveCharDb(character: Character): Observable<string> {
    const userId = localStorage.getItem('currentUser');
    return this.httpClient.post<string>(this.characterUrl + `/${userId}`, {character: character});
  }
}

