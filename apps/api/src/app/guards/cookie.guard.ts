import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookie = req.cookies['session.id'];
    let isAuthenticated = false;
    return this.authService.getUserByCookie(cookie).pipe(
      map((user) => {
        req.user = user;
        isAuthenticated = true;
        return isAuthenticated;
      }),
      catchError(() => {
        const refresh = req.cookies['session.refresh'];
        return this.authService.getUserByCookie(refresh);
      }),
      map((user) => {
        if (isAuthenticated) {
          return isAuthenticated;
        }
        req.user = user;
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
