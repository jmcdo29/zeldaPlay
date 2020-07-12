import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.cookies);
    const cookie = req.cookies['sessionId'];
    return this.authService.getUserByCookie(cookie).pipe(
      map((user) => {
        req.user = user;
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
