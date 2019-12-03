import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../../database/database.service';
import { GoogleSub } from '../auth/models/google.payload';
import { GoogleUser } from '../user/models/google-user.model';

@Injectable()
export class GoogleUserService {
  constructor(private readonly db: DatabaseService<GoogleUser>) {}

  getByGoogleId(id: string): Observable<GoogleUser> {
    const fields: string[] = [];
    fields.push(
      'id as id',
      'roles as roles',
      'email as email',
      'first_name as "firstName"',
      'last_name as "lastName"',
      'google_id as "googleId"',
    );
    const query = fields.join(', ');
    const where = 'google_id = $1';
    return this.db
      .query({
        query,
        where,
        variables: [id],
      })
      .pipe(map((users) => users[0]));
  }

  createNewGoogleUser(profile: GoogleSub): Observable<GoogleUser> {
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    const variables: any[] = [];
    params.fields.push('email');
    variables.push(
      profile.emails
        .filter((email) => email.verified)
        .map((email) => email.value)[0],
    );
    params.fields.push('first_name');
    variables.push(profile.name.givenName);
    params.fields.push('last_name');
    variables.push(profile.name.familyName);
    params.fields.push('consent_to_email');
    variables.push(true);
    params.fields.push('roles');
    variables.push(['player']);
    params.fields.push('google_id');
    variables.push(profile.id);
    for (let i = 1; i <= params.fields.length; i++) {
      params.values.push(`$${i}`);
    }
    return this.db
      .insert({
        query: params.fields.join(', '),
        where: params.values.join(', '),
        variables,
      })
      .pipe(
        map((users) => users[0]),
        map((user) => ({
          email: profile.emails
            .filter((email) => email.verified)
            .map((email) => email.value)[0],
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleId: profile.id,
          roles: ['player'],
          ...user,
        })),
      );
  }
}
