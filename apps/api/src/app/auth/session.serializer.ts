import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GoogleUser } from '../user/models/google-user.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    userObs: Observable<GoogleUser>,
    done: (err: Error, user: any) => void,
  ) {
    userObs.subscribe({
      next: (user) => {
        done(null, { id: user.id, email: user.email });
      },
      error: (err) => {
        done(err, null);
      },
    });
  }

  deserializeUser(payload: any, done: (err: Error, user: any) => void) {
    console.log(payload);
    done(null, payload);
  }
}
