import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CookieService } from '../../cookie/cookie.service';
import { ReqWithCookies } from '../../interfaces/req-with-cookies.interface';
import { RedisService } from '../../redis/redis.service';
import { GoogleService } from '../google/google.service';
import { LocalService } from '../local/local.service';
import { GoogleUser } from '../user/models/google-user.model';
import { UserService } from '../user/user.service';
import { AuthDTO, LoginDTO, SignupDTO } from './models';
import { UserDTO } from '../user/models';

const hour = 60 * 60 * 1000;
const day = 24 * hour;

@Injectable()
export class AuthService {
  constructor(
    private readonly localService: LocalService,
    private readonly googleService: GoogleService,
    private readonly cookieService: CookieService,
    private readonly redis: RedisService,
    private readonly userService: UserService,
  ) {}

  getOauthLoginUrl(type: 'google'): string {
    let loginUrl: string;
    switch (type) {
      case 'google':
        loginUrl = this.googleService.getLoginUrl();
    }
    return loginUrl;
  }

  login(req: ReqWithCookies, login: LoginDTO): Observable<AuthDTO> {
    return this.localService.login(login).pipe(
      switchMap((user) => {
        return this.setCookie(req, user);
      }),
    );
  }

  signup(req: ReqWithCookies, signup: SignupDTO): Observable<AuthDTO> {
    return this.localService.signup(signup).pipe(
      switchMap((user) => {
        return this.setCookie(req, user);
      }),
    );
  }

  getGoogleUser(req: ReqWithCookies, code: string): Observable<GoogleUser> {
    return this.googleService.getUserProfile(code).pipe(
      switchMap((user) => {
        return this.setCookie(req, user);
      }),
    );
  }

  private setCookie<T extends AuthDTO>(
    req: ReqWithCookies,
    user: T,
  ): Observable<T> {
    return this.redis
      .set(
        this.cookieService.setCookie(req, 'session.id', undefined, {
          expires: new Date(Date.now() + hour / 60),
        }),
        user.id,
        hour,
      )
      .pipe(
        switchMap(() => {
          return this.redis.set(
            this.cookieService.setCookie(req, 'session.refresh', undefined, {
              expires: new Date(Date.now() + 14 * day),
            }),
            user.id,
            (5 * hour) / 60,
          );
        }),
        map(() => user),
      );
  }

  refreshSession(req: ReqWithCookies, user: AuthDTO): Observable<AuthDTO> {
    return this.setCookie(req, user);
  }

  getUserByCookie(cookie: string): Observable<UserDTO | undefined> {
    return this.redis.get(cookie).pipe(
      switchMap((userId: string) => {
        if (!userId) {
          return of(undefined);
        }
        return this.userService.getById({ id: userId });
      }),
    );
  }
}
