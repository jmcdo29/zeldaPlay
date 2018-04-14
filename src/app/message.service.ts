import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: String[] = [];

  add(message: String): void {
    const time = new Date(Date.now());

    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const dateString = month + '/' + day + ' ' + hour + ':' + minute + ':' + second;

    message = dateString + ' :: ' + message;

    this.messages.unshift(message);
  }

  clear(): void {
    this.messages = [];
  }

}
