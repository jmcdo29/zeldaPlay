import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { scribe } from 'mc-scribe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const auth = request.headers['authorization'].split(' ')[1];
      if (!auth) {
        return false;
      } else {
        const token = verify(auth, process.env.TOKEN_SECRET);
        return this.validate(token);
      }
    } catch (err) {
      scribe.error(err.message);
      scribe.fine(err.stack);
      return false;
    }
  }

  validate(token: any): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.validateUser(token).pipe(map((user) => !!user));
  }
}
