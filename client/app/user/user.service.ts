import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(username: string, password: string, confPass: string) {
    return this.http.post<any>(environment.apiUrl + '/users/signup', {
      username,
      password,
      confPass
    });
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/users/login', {
      username,
      password
    });
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}
