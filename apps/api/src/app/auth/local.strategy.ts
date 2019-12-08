import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { AuthDTO } from './auth/models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      // tslint:disable-next-line: no-hardcoded-credentials
      passwordField: 'password',
      passReqToCallback: true,
      session: true,
    });
  }

  validate(req: Request, email: string, password: string): Observable<AuthDTO> {
    return this.authService.login({ email, password }).pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }),
    );
  }
}
