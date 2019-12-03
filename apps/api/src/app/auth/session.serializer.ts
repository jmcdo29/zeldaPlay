import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserDTO } from './user/models';
import { GoogleUser } from './user/models/google-user.model';
import { UserService } from './user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  userOrNull(
    user: GoogleUser | UserDTO,
    done: (error: Error, user: any) => void,
  ): void {
    user ? done(null, { id: user.id, email: user.email }) : done(null, null);
  }

  serializeUser(
    userObs: Observable<GoogleUser>,
    done: (err: Error, user: any) => void,
  ) {
    userObs.subscribe({
      next: (user) => this.userOrNull(user, done),
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
      next: (user) => this.userOrNull(user, done),
      error: (err) => {
        done(err, null);
      },
    });
  }
}
