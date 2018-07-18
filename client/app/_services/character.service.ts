import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { Character } from '../_models/character';

import * as FileSaver from 'file-saver';

import { environment } from '../../environments/environment';

@Injectable()
export class CharacterService {

  private characterUrl = environment.apiUrl + '/api/characters';

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getCharacters(): Observable<Character[]> {
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

  private handleError<T> (operation: String, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      const errMsg = 'ERROR IN ' + operation.toUpperCase() + ': ' + error.message;
      this.messageService.add(errMsg);
      return of(result as T);
    };
  }

  saveChar(character: Character) {
    const characterString = JSON.stringify(character);
    const blob = new Blob([characterString], {
      type: 'application/json'
    });
    FileSaver.saveAs(blob, character.name + '_zeldaplay.json');
  }
}

