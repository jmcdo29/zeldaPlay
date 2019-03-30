import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  /**
   * Function to add messages to the top of the messages array. Will be shown on the UI
   * @param message The message to add
   */
  add(message: string): void {
    message = this.getDateString() + ' :: ' + message;
    this.messages.unshift(message);
  }

  /**
   * easy function to get date string in local format. Really just to keep code clean.
   */
  private getDateString(): string {
    return new Date(Date.now()).toLocaleString();
  }
}
