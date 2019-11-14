import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { GoogleSub } from './models/google.payload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.getGoogleClient(),
      clientSecret: config.getGoogleSecret(),
      callbackURL: config.getGoogleCallback(),
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleSub,
    callback: (err: Error, user: any) => void,
  ) {
    console.log('Google Strategy Validate invoked');
    return this.authService
      .findOrCreateGoogleUser(profile)
      .pipe(
        map((user) => {
          if (!user) {
            throwError(new UnauthorizedException());
          }
          return user;
        }),
      )
      .subscribe({
        next: (user) => callback(null, user),
        error: (err) => {
          callback(err, null);
        },
      });
  }
}
