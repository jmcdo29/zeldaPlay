import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth/auth.service';
import { GoogleSub } from './auth/models/google.payload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.googleClient,
      clientSecret: config.googleSecret,
      callbackURL: config.googleCallback,
      scope: ['profile', 'email'],
      passReqToCallback: true,
      prompt: 'select_account',
    });
  }

  validate(
    req: ReqWithCookies,
    accessToken: string,
    refreshToken: string,
    profile: GoogleSub,
  ) {
    console.log(req);
    console.log(`Access Token: ${accessToken}`);
    console.log(`Refresh Token: ${refreshToken}`);
    return this.authService.findOrCreateGoogleUser({ user: profile, req }).pipe(
      map((user) => {
        if (!user) {
          throwError(new UnauthorizedException());
        }
        return user;
      }),
    );
  }
}
