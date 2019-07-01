import { Inject, Injectable } from '@nestjs/common';
import { Signup, User, UserId } from '@tabletop-companion/api-interface';
import { hashSync } from 'bcrypt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatabaseService } from '../database/database.service';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class UserService {
  private readonly logger = new MyLogger(UserService.name);

  constructor(private readonly db: DatabaseService) {}

  getByEmail(email: string): Observable<User> {
    return this.db
      .query<User>({
        query: 'SELECT id, email, role, password FROM players WHERE email = $1',
        variables: [email]
      })
      .pipe(map((users) => users[0]));
  }

  getById(userId: UserId): Observable<User> {
    return this.db
      .query<User>({
        query: 'SELECT * FROM players WHERE id = $1',
        variables: [userId.id]
      })
      .pipe(map((users) => users[0]));
  }

  insertUser(signupBody: Signup): Observable<User> {
    return this.db
      .query<User>({
        query: `INSERT INTO players
        (
          email
          ,password
          ,"consentToEmail"
          ,"firstName"
          ,"lastName"
          ,role
        )
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
        variables: [
          signupBody.email,
          hashSync(signupBody.password, 12),
          signupBody.consentToEmail,
          signupBody.firstName,
          signupBody.lastName,
          signupBody.role
        ]
      })
      .pipe(map((newUsers) => newUsers[0]));
  }

  updateUser(updateBody: Partial<User>, userId: UserId): Observable<any> {
    return of();
  }

  deleteUser(userId: UserId): Observable<void> {
    this.db
      .query({
        query: 'UPDATE players SET "isActive"=$1 WHERE id = $2',
        variables: [false, userId.id]
      })
      .subscribe();
    this.logger.log(`User with id ${userId.id} deactivated.`);
    return of();
  }
}
