import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SignupDTO } from '../auth/models';
import { DatabaseService } from '../database/database.service';
import { MyLogger } from '../logger/logger.service';
import { UserDTO, UserIdDTO, UserUpdateDataDTO } from './models';

@Injectable()
export class UserService {
  private readonly logger = new MyLogger(UserService.name);

  constructor(private readonly db: DatabaseService) {}

  getByEmail(email: string): Observable<UserDTO> {
    const fields: string[] = [];
    fields.push('id as id');
    fields.push('email as email');
    fields.push('role as role');
    fields.push('password as password');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM players WHERE email = $1;';
    return this.db
      .query<UserDTO>({
        query,
        variables: [email],
      })
      .pipe(map((users) => users[0]));
  }

  getById(userId: UserIdDTO): Observable<UserDTO> {
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
      .query<UserDTO>({
        query,
        variables: [userId.id],
      })
      .pipe(map((users) => users[0]));
  }

  insertUser(signupBody: SignupDTO): Observable<UserDTO> {
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    const userVariables: any[] = [];
    let query = 'INSERT INTO players (';
    params.fields.push('email');
    userVariables.push(signupBody.email);
    params.fields.push('password');
    userVariables.push(hashSync(signupBody.password, 12));
    params.fields.push('consent_to_email');
    userVariables.push(signupBody.consentToEmail);
    params.fields.push('first_name');
    userVariables.push(signupBody.firstName);
    params.fields.push('last_name');
    userVariables.push(signupBody.lastName);
    params.fields.push('role');
    for (let i = 1; i <= params.fields.length; i++) {
      params.values.push(`$${i}`);
    }
    userVariables.push(signupBody.role);
    query += params.fields.join(', ');
    query += ') VALUES (';
    query += params.values.join(', ');
    query += ') RETURNING id;';
    return this.db
      .query<UserDTO>({
        query,
        variables: userVariables,
      })
      .pipe(
        map((newUsers) => newUsers[0]),
        map((user) => {
          user = {
            id: user.id,
            isActive: true,
            ...signupBody,
          };
          return user;
        }),
      );
  }

  updateUser(updateBody: UserUpdateDataDTO): Observable<any> {
    return of();
  }

  deleteUser(userId: UserIdDTO): Observable<void> {
    this.db
      .query({
        query: 'UPDATE players SET is_active=$1 WHERE id = $2',
        variables: [false, userId.id],
      })
      .subscribe();
    this.logger.log(`User with id ${userId.id} deactivated.`);
    return of();
  }
}
