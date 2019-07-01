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
    const fields: string[] = [];
    fields.push('id as id');
    fields.push('email as email');
    fields.push('role as role');
    fields.push('password as password');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM players WHERE email = $1;';
    return this.db
      .query<User>({
        query,
        variables: [email]
      })
      .pipe(map((users) => users[0]));
  }

  getById(userId: UserId): Observable<User> {
    const fields: string[] = [];
    fields.push('id as id');
    fields.push('email as email');
    fields.push('role as role');
    fields.push('password as password');
    fields.push('first_name as "firstName"');
    fields.push('last_name as "lastName"');
    fields.push('consent_to_email as "consentToEmail"');
    fields.push('is_active as "isActive"');
    fields.push('role as role');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM players WHERE id = $1;';
    return this.db
      .query<User>({
        query,
        variables: [userId.id]
      })
      .pipe(map((users) => users[0]));
  }

  insertUser(signupBody: Signup): Observable<User> {
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: []
    };
    const userVariables: any[] = [];
    let query = 'INSERT INTO players (';
    params.fields.push('email');
    params.values.push('$1');
    userVariables.push(signupBody.email);
    params.fields.push('password');
    params.values.push('$2');
    userVariables.push(hashSync(signupBody.password, 12));
    params.fields.push('consent_to_email');
    params.values.push('$3');
    userVariables.push(signupBody.consentToEmail);
    params.fields.push('first_name');
    params.values.push('$4');
    userVariables.push(signupBody.firstName);
    params.fields.push('last_name');
    params.values.push('$5');
    userVariables.push(signupBody.lastName);
    params.fields.push('role');
    params.values.push('$6');
    userVariables.push(signupBody.role);
    query += params.fields.join(', ');
    query += ') VALUES (';
    query += params.values.join(', ');
    query += ') RETURNING id;';
    return this.db
      .query<User>({
        query,
        variables: userVariables
      })
      .pipe(
        map((newUsers) => newUsers[0]),
        map((user) => {
          for (const key of Object.keys(signupBody)) {
            user[key] = signupBody[key];
          }
          user.isActive = true;
          return user;
        })
      );
  }

  updateUser(updateBody: Partial<User>, userId: UserId): Observable<any> {
    return of();
  }

  deleteUser(userId: UserId): Observable<void> {
    this.db
      .query({
        query: 'UPDATE players SET is_active=$1 WHERE id = $2',
        variables: [false, userId.id]
      })
      .subscribe();
    this.logger.log(`User with id ${userId.id} deactivated.`);
    return of();
  }
}
