import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    message = this.getDateString() + ' :: ' + message;
    this.messages.unshift(message);
  }

  getDateString(): string {
    return new Date(Date.now()).toLocaleString();
  }
}
