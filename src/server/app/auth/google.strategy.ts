import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { AuthService } from '@Auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email']
    });
  }

  // TODO: Find good way to pass value of token, provider, email, and userId to server from here.
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done
  ) {
    console.log('profile\n', profile);
    console.log('accessToken\n', accessToken);
    console.log('refreshToken\n', refreshToken);
    // tslint:disable-next-line:no-commented-code
    // this.authService.validateUser(accessToken as any);
    return accessToken;
  }
}
