// Service for creating and updating users on the server.
// NOT to be used for authentication!!

import { Injectable } from '@angular/core';

import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from '../../../node_modules/rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string, confPass: string) {
    return this.http.post<User>(environment.apiUrl + '/users/signup', {username: username, password: password, confPass: confPass});
  }
}
