import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';

interface UserReg {
  email: string;
  password: string;
  confirmationPassword: string;
  recovery: Array<{ question: string; answer: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * A function of the UserService to register the new user into the database
   * @param newUser The user being registered
   */
  register(newUser: UserReg): Observable<void> {
    return this.http
      .post<any>(environment.apiUrl + '/signup', {
        user: newUser
      })
      .pipe(this.saveUser());
  }

  /**
   * Function to allow users to log in to the system
   * @param username The email of the user trying to log in
   * @param password The password of the user trying to log in
   */
  login(username: string, password: string): Observable<void> {
    return this.http
      .post<any>(environment.apiUrl + '/login', {
        user: {
          email: username,
          password
        }
      })
      .pipe(this.saveUser());
  }

  /**
   * Function to remove the user id and access token from the session storage
   */
  logout(): void {
    this.http.post<any>(environment.apiUrl + '/logout', {}).subscribe();
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
  }

  /**
   * Function top receive the recovery questions. Necessary for sign up
   */
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/questions');
  }

  /**
   * An Observable piping function to take in a user and save their Id and access token into sessionStorage
   */
  private saveUser(): OperatorFunction<any, void> {
    return map((user: any) => {
      sessionStorage.setItem('currentUser', user.id);
      sessionStorage.setItem('userToken', user.accessToken);
    });
  }
}
