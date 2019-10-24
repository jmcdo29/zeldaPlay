import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { ConfigService } from '../config/config.service';
// import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(readonly config: ConfigService) {
    super({
      clientId: config.getGoogleClient(),
      clientSecret: config.getGoogleSecret(),
      callbackURL: config.getGoogleCallback(),
    });
  }
}
