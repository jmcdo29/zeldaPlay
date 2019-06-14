import { BadRequestException, Injectable } from '@nestjs/common';
import {
  LoginBody,
  SignupBody,
  User,
  UserId
} from '@tabletop-companion/api-interface';
import { hash } from 'bcrypt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  getByEmail(email: string): Observable<User> {
    return this.db
      .query<User>({
        query: 'SELECT id, email FROM players WHERE email = $1',
        variables: [email]
      })
      .pipe(map((users) => users[0]));
  }

  getById(id: UserId): Observable<User> {
    return this.db
      .query<User>({
        query: 'SELECT * FROM players WHERE id = $1',
        variables: [id]
      })
      .pipe(map((users) => users[0]));
  }

  signup(signupBody: SignupBody): Observable<User> {
    return this.getByEmail(signupBody.email).pipe(
      map(async (existingUser) => {
        if (existingUser) {
          throw new BadRequestException(
            `User with email ${signupBody.email} already exists.`
          );
        }
        const hashPass = await hash(signupBody.password, 12);
        return this.db.query<User>({
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
            hashPass,
            signupBody.consentToEmail,
            signupBody.firstName,
            signupBody.lastName,
            signupBody.role
          ]
        });
      }),
      map((newUsers) => newUsers[0])
    );
  }

  update(updateBody: Partial<User>, id: UserId): Observable<any> {
    return of();
  }

  delete(id: UserId): Observable<any> {
    return of();
  }
}
