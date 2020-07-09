import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ReqWithCookies } from '../interfaces/req-with-cookies.interface';

@Injectable()
export class CookieService {
  setCookie(req: ReqWithCookies): string {
    const sessionId = randomBytes(8).toString('hex');
    req._cookies?.length
      ? req._cookies.push({
          name: 'sessionId',
          val: sessionId,
        })
      : (req._cookies = [
          {
            name: 'sessionId',
            val: sessionId,
          },
        ]);
    return sessionId;
  }

  // checkCookie(cookie: string): boolean {}
}
