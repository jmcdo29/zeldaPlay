import { ExpressCookieRequest } from 'nest-cookies';
import { UserDTO } from '../auth/user/models';

export interface ReqWithUser extends ExpressCookieRequest {
  user?: Omit<UserDTO, 'password'>;
}
