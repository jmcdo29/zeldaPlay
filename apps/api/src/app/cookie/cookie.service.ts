import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CookieOptions } from 'express';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';

@Injectable()
export class CookieService {
  setCookie(
    req: ReqWithCookies,
    cookieName: string,
    value?: string,
    options?: CookieOptions,
  ): string {
    value = value ? value : randomBytes(16).toString('hex');
    req._cookies?.length
      ? req._cookies.push({
          name: cookieName,
          val: value,
          options,
        })
      : (req._cookies = [
          {
            name: cookieName,
            val: value,
            options,
          },
        ]);
    return value;
  }

  // checkCookie(cookie: string): boolean {}
}
