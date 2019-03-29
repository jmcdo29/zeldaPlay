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

  register(newUser: UserReg): Observable<void> {
    return this.http
      .post<any>(environment.apiUrl + '/signup', {
        user: newUser
      })
      .pipe(saveUser());
  }

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<any>(environment.apiUrl + '/login', {
        user: {
          email: username,
          password
        }
      })
      .pipe(saveUser());
  }

  logout(): void {
    this.http.post<any>(environment.apiUrl + '/logout', {}).subscribe();
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
  }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/questions');
  }
}

function saveUser(): OperatorFunction<any, void> {
  return map((user: any) => {
    sessionStorage.setItem('currentUser', user.id);
    sessionStorage.setItem('userToken', user.accessToken);
  });
}
