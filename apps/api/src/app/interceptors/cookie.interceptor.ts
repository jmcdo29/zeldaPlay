import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ReqWithCookies>();
    const res = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap(() => {
        const cookies = req._cookies;
        if (cookies?.length) {
          cookies.forEach((cookie) => {
            res.cookie(cookie.name, cookie.val, cookie.options);
          });
        }
      }),
    );
  }
}
