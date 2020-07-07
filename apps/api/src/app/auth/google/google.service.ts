import { HttpService, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';
import { DatabaseTable } from '../../database/database.decorator';
import { DatabaseService } from '../../database/database.service';
import { GoogleSub, GoogleToken } from '../auth/models';
import { GoogleUser } from '../user/models/google-user.model';
import { ReqWithCookies } from '../../interfaces/req-with-cookies.interface';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class GoogleService {
  constructor(
    @DatabaseTable('players') private readonly db: DatabaseService<GoogleUser>,
    private readonly config: ConfigService,
    private readonly http: HttpService,
    private readonly redis: RedisService,
  ) {}

  getLoginUrl(): string {
    return `https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&client_id=${this.config.googleClient}&response_type=code&redirect_uri=${this.config.googleCallback}&access_type=online&prompt=select_account&state=some_state_token`;
  }

  getUserProfile(req: ReqWithCookies, code: string): Observable<any> {
    let googleUserData: GoogleSub;
    let googleUser: GoogleUser;
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
      switchMap((user) => {
        googleUser = user;
        const sessionId = this.setCookie(req);
        return this.redis.set(sessionId, user.id);
      }),
      switchMap(() => of(googleUser)),
    );
  }

  private getGoogleToken(code: string): Observable<GoogleToken> {
    return this.http
      .post<GoogleToken>(
        `https://oauth2.googleapis.com/token`,
        {
          client_id: this.config.googleClient,
          client_secret: this.config.googleSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.config.googleCallback,
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

  private setCookie(req: ReqWithCookies): string {
    const sessionId = randomBytes(8).toString('hex');
    console.log(sessionId);
    req._cookies?.length
      ? req._cookies.push({
          name: 'user_cookie',
          val: sessionId,
        })
      : (req._cookies = [
          {
            name: 'user_cookie',
            val: sessionId,
          },
        ]);
    return sessionId;
  }

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
      .insert({
        query: params.fields.join(', '),
        where: params.values.join(', '),
        variables,
      })
      .pipe(
        map((users) => users[0]),
        map((user) => ({
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          googleId: profile.id,
          roles: ['player'],
          ...user,
        })),
      );
  }
}
