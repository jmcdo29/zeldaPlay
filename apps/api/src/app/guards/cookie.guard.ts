import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';
import { AuthDTO } from '../auth/auth/models';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookie = req.cookies['session.id'] || '';
    const refresh = req.cookies['session.refresh'] || '';
    console.log(req.cookies);
    console.log(refresh);
    let refreshed = false;
    return this.authService.getUserByCookie(cookie).pipe(
      switchMap((user) => {
        console.log(user);
        if (user) {
          return of(user);
        }
        refreshed = true;
        return this.authService.getUserByCookie(refresh);
      }),
      switchMap((user) => {
        if (!user) {
          return of(false);
        }
        req.user = user;
        if (refreshed) {
          return this.authService.refreshSession(req, user);
        }
        return of(user);
      }),
      map((user) => {
        if (!user) {
          return false;
        }
        return true;
      }),
    );
  }
}
