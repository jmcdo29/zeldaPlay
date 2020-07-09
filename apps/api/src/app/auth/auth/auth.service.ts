import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CookieService } from '../../cookie/cookie.service';
import { ReqWithCookies } from '../../interfaces/req-with-cookies.interface';
import { RedisService } from '../../redis/redis.service';
import { GoogleService } from '../google/google.service';
import { LocalService } from '../local/local.service';
import { GoogleUser } from '../user/models/google-user.model';
import { AuthDTO, LoginDTO, SignupDTO } from './models';

@Injectable()
export class AuthService {
  constructor(
    private readonly localService: LocalService,
    private readonly googleService: GoogleService,
    private readonly cookieService: CookieService,
    private readonly redis: RedisService,
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

  private setCookie<T extends { id: string }>(
    req: ReqWithCookies,
    user: T,
  ): Observable<T> {
    return this.redis
      .set(this.cookieService.setCookie(req), user.id)
      .pipe(map(() => user));
  }
}
