import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
      clientID: config.getGoogleClient(),
      clientSecret: config.getGoogleSecret(),
      callbackURL: config.getGoogleCallback(),
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: GoogleSub,
  ) {
    return this.authService.findOrCreateGoogleUser(profile).pipe(
      map((user) => {
        if (!user) {
          throwError(new UnauthorizedException());
        }
        return user;
      }),
    );
  }
}
