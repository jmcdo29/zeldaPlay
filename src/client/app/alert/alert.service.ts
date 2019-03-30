import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();

  constructor(private router: Router) {}

  /**
   * Action happened successfully (like signing up or logging in)
   * @param message The message being shown
   */
  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  /**
   * Something went wrong (bad values in character/spell/weapon save or invalid login)
   * @param message The message to be shown
   */
  error(message: string) {
    this.subject.next({ type: 'error', text: message });
  }

  /**
   * Return the messages
   */
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Move to the next message
   */
  clear(): void {
    this.subject.next();
  }
}
