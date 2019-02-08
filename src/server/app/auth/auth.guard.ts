import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { consoleLogger as scribe } from 'mc-scribe';
import { Observable } from 'rxjs';

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
      scribe('ERROR', err.message);
      scribe('FINE', err.stack);
      return false;
    }
  }

  validate(token: any): boolean | Promise<boolean> | Observable<boolean> {
    return !!this.authService.validateUser(token);
  }
}
