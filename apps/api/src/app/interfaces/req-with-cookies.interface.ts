import { CookieOptions, Request } from 'express';

export interface ReqWithCookies extends Request {
  _cookies: Array<{
    name: string;
    val: string;
    options?: CookieOptions;
  }>;
}
