import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: String[] = [];

  add(message: String): void {
    this.messages.unshift(message);
  }

  clear(): void {
    this.messages = [];
  }

}
