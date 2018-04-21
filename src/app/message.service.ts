import { Injectable } from '@angular/core';
import { methods } from './Character/character-methods';

@Injectable()
export class MessageService {

  messages: String[] = [];

  add(message: String): void {
    message = methods.getDateString() + ' :: ' + message;
    this.messages.unshift(message);
  }

}
