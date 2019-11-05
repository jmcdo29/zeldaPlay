import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { GoogleSub } from './models/google.payload';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: GoogleSub, done: (err: Error, user: any) => void) {
    console.log('Trying to serialize');
    console.log(user);
    done(null, user.id);
  }

  deserializeUser(user: any, done: (err: Error, user: any) => void) {
    console.log('Trying to deserialize');
    console.log(user);
    done(null, user);
  }
}
