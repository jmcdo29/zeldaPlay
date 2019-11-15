import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { GoogleUser } from '../user/models/google-user.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: GoogleUser, done: (err: Error, user: any) => void) {
    if (user.id) {
      return done(null, user.id);
    }
    done(null, null);
  }

  deserializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user);
  }
}
