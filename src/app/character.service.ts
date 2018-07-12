import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { Character } from './Character/character';

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
}

interface CustErr {
  body: {error: String};
}
