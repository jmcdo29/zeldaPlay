import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MyLogger } from '../logger/logger.service';
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
      MyLogger.error(err.message, err.stack, AuthGuard.name);
      return false;
    }
  }

  validate(token: any): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.validateUser(token).pipe(map((user) => !!user));
  }
}
