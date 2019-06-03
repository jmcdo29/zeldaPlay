import { Injectable } from '@nestjs/common';
import {
  LoginBody,
  SignupBody,
  UpdateBody,
  UserId
} from '@tabletop-companion/api-interface';
import { Observable, of } from 'rxjs';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  login(loginBody: LoginBody): Observable<any> {
    return of();
  }

  signup(signupBody: SignupBody): Observable<any> {
    return of();
  }

  update(updateBody: UpdateBody, id: UserId): Observable<any> {
    return of();
  }

  delete(id: UserId): Observable<any> {
    return of();
  }

  getAccount(id: UserId): Observable<any> {
    return of();
  }
}
