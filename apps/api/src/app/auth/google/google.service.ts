import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DatabaseTable } from '../../database/database.decorator';
import { DatabaseService } from '../../database/database.service';
import { GoogleSub, GoogleToken } from '../models';
import { GoogleUser } from '../user/models/google-user.model';
import { GOOGLE_OPTIONS } from './google.constants';
import { GoogleModuleOptions } from './google.interface';

@Injectable()
export class GoogleService {
  constructor(
    @DatabaseTable('players') private readonly db: DatabaseService<GoogleUser>,
    @Inject(GOOGLE_OPTIONS) private readonly options: GoogleModuleOptions,
    private readonly http: HttpService,
  ) {}

  getLoginUrl(): string {
    return `https://accounts.google.com/o/oauth2/v2/auth?scope=${this.options.scope.join(
      ' ',
    )}&client_id=${this.options.clientId}&response_type=${
      this.options.responseType
    }&redirect_uri=${this.options.callbackUrl}&access_type=online&prompt=${
      this.options.prompt
    }&state=${this.options.state}`;
  }

  getUserProfile(code: string, state: string): Observable<any> {
    let googleUserData: GoogleSub;
    if (state !== this.options.state) {
      throw new BadRequestException();
    }
    return this.getGoogleToken(code).pipe(
      switchMap((tokenData) => {
        return this.getGoogleUser(tokenData);
      }),
      switchMap((userData) => {
        googleUserData = userData;
        return this.getByGoogleId(userData.id);
      }),
      switchMap((user) => {
        if (user) {
          return of(user);
        }
        return this.createNewGoogleUser(googleUserData);
      }),
    );
  }

  private getGoogleToken(code: string): Observable<GoogleToken> {
    return this.http
      .post<GoogleToken>(
        `https://oauth2.googleapis.com/token`,
        {
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.options.callbackUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .pipe(map((tokenData) => tokenData.data));
  }

  private getGoogleUser(tokenData: GoogleToken): Observable<GoogleSub> {
    return this.http
      .get<GoogleSub>('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })
      .pipe(map((userDataResp) => userDataResp.data));
  }

  getByGoogleId(id: string): Observable<GoogleUser> {
    const fields: string[] = [];
    fields.push('id', 'roles', 'email', 'first_name', 'last_name', 'google_id');
    const query = fields.join(', ');
    const where = 'google_id = $1';
    return this.db
      .query(
        {
          query,
          where,
          variables: [id],
        },
        GoogleUser,
      )
      .pipe(map((users) => users[0]));
  }

  createNewGoogleUser(profile: GoogleSub): Observable<GoogleUser> {
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    const variables: any[] = [];
    params.fields.push('email');
    variables.push(profile.email);
    params.fields.push('first_name');
    variables.push(profile.given_name);
    params.fields.push('last_name');
    variables.push(profile.family_name);
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
      .insert(
        {
          query: params.fields.join(', '),
          where: params.values.join(', '),
          variables,
        },
        GoogleUser,
      )
      .pipe(map((users) => users[0]));
  }
}
