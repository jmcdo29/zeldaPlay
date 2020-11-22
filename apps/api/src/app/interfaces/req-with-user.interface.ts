import { NestCookieRequest } from 'nest-cookies';
import type { Request } from 'express';
import { UserDTO } from '../auth/user/models';

export interface ReqWithUser extends NestCookieRequest<Request> {
  user?: Omit<UserDTO, 'password'>;
}
