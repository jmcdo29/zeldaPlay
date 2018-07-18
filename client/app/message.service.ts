import { Injectable } from '@angular/core';
import { methods } from './Character/character-methods';

@Injectable()
export class MessageService {

  messages: string[] = [];

  add(message: string): void {
    message = methods.getDateString() + ' :: ' + message;
    this.messages.unshift(message);
  }

}
