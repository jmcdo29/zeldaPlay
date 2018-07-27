// Service used for logging users in and out of the app.

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  login (username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/users/login', {username: username, password: password});
  }

  logout () {
    localStorage.removeItem('currentUser');
  }
}
