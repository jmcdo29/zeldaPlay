import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import type { Request } from 'express';
import { Cookie, NestCookieRequest } from 'nest-cookies';

@Injectable()
export class CookieService {
  setCookie(
    req: NestCookieRequest<Request>,
    cookieName: string,
    value?: string,
    options?: Cookie['options'],
  ): string {
    value = value ? value : randomBytes(16).toString('hex');
    req._cookies?.length
      ? req._cookies.push({
          name: cookieName,
          value: value,
          options,
        })
      : (req._cookies = [
          {
            name: cookieName,
            value: value,
            options,
          },
        ]);
    return value;
  }

  // checkCookie(cookie: string): boolean {}
}
