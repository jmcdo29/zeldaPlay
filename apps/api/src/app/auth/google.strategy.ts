import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
// import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(readonly config: ConfigService) {
    // private readonly authService: AuthService,
    super({
      clientID: config.getGoogleClient(),
      clientSecret: config.getGoogleSecret(),
      callbackURL: config.getGoogleCallback(),
      scope: ['profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    callback: (err: Error, user: any) => void,
  ) {
    // return this.authService.validateUser({} as any).pipe(
    return of(profile).pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }
        callback(null, user);
      }),
    );
  }
}
