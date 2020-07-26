import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookie = req.cookies['session.id'] || '';
    const refresh = req.cookies['session.refresh'] || '';
    let refreshed = false;
    return this.authService.getUserByCookie(cookie).pipe(
      switchMap((user) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...reqUser } = user;
        req.user = reqUser;
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
