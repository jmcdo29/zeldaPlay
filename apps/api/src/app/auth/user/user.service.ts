import { BadRequestException, Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { hashSync } from 'bcrypt';
import { empty, iif, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { DatabaseTable } from '../../database/database.decorator';
import { DatabaseService } from '../../database/database.service';
import { SignupDTO } from '../models';
import { UserDTO, UserIdDTO, UserUpdateDataDTO } from './models';

@Injectable()
export class UserService {
  constructor(
    @DatabaseTable('players')
    private readonly db: DatabaseService<UserDTO>,
    @OgmaLogger(UserService)
    private readonly logger: OgmaService,
  ) {}

  getByEmail(email: string): Observable<UserDTO> {
    const fields: string[] = [];
    fields.push('id');
    fields.push('email');
    fields.push('roles');
    fields.push('password');
    const query = fields.join(', ');
    const where = 'email = $1;';
    return this.db
      .query(
        {
          query,
          where,
          variables: [email],
        },
        UserDTO,
      )
      .pipe(map((users) => users[0]));
  }

  getById(userId: UserIdDTO): Observable<UserDTO> {
    const fields: string[] = [];
    fields.push('id');
    fields.push('email');
    fields.push('roles');
    fields.push('password');
    fields.push('first_name');
    fields.push('last_name');
    fields.push('consent_to_email');
    fields.push('is_active');
    const query = fields.join(', ');
    const where = 'id = $1;';
    return this.db
      .query(
        {
          query,
          where,
          variables: [userId.id],
        },
        UserDTO,
      )
      .pipe(map((users) => users[0]));
  }

  insertUser(signupBody: SignupDTO): Observable<UserDTO> {
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    const userVariables: any[] = [];
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
    params.fields.push('roles');
    for (let i = 1; i <= params.fields.length; i++) {
      params.values.push(`$${i}`);
    }
    userVariables.push(signupBody.role);
    return this.db
      .insert(
        {
          query: params.fields.join(', '),
          where: params.values.join(', '),
          variables: userVariables,
        },
        UserDTO,
      )
      .pipe(
        mergeMap((newUsers) =>
          iif(
            () => newUsers.length !== 0,
            of(newUsers[0]),
            throwError(
              new BadRequestException(
                `No user was created. Please contact your system administrator for details.`,
              ),
            ),
          ),
        ),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser(updateBody: UserUpdateDataDTO): Observable<any> {
    return of();
  }

  deleteUser(userId: UserIdDTO): Observable<void> {
    this.db
      .update(
        {
          query: 'is_active = $1',
          where: 'id = $2',
          variables: [false, userId.id],
        },
        UserDTO,
      )
      .subscribe();
    this.logger.log(`User with id ${userId.id} deactivated.`);
    return empty();
  }
}
