import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GoogleUser } from '../user/models/google-user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

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

  deserializeUser(
    payload: { id: string; email: string },
    done: (err: Error, user: any) => void,
  ) {
    this.userService.getById({ id: payload.id }).subscribe({
      next: (user) => done(null, { id: user.id, email: user.email }),
      error: (err) => done(err, null),
    });
  }
}
