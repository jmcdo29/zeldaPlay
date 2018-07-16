import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { Character } from './Character/character';

import * as FileSaver from 'file-saver';
import { bloomFindPossibleInjector } from '../../node_modules/@angular/core/src/render3/di';

@Injectable()
export class CharacterService {

  private characterUrl = '/api/characters';

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.characterUrl)
    .pipe(
      tap(ch => {
        const outcome = ch ? 'Got characters' : 'Found a problem';
        this.messageService.add(outcome);
      }),
      catchError(this.handleError('get characters', []))
    );
  }

  private handleError<T> (operation: String, result?: T) {
    return (error: CustErr): Observable<T> => {
      console.log(error);
      const errMsg = 'ERROR IN ' + operation.toUpperCase() + ': ' + error.body.error;
      this.messageService.add(errMsg);
      return of(result as T);
    };
  }

  saveChar(character: Character) {
    const blob = new Blob([JSON.stringify(character)], {
      type: 'application/json'
    });
    FileSaver.saveAs(blob, character.name + '_zeldaplay.json');
  }
}

interface CustErr {
  body: {error: String};
}
