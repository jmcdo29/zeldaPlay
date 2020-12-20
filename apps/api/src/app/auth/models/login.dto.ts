import { t } from '@deepkit/type';
import { Login } from '@tabletop-companion/api-interface';

export class LoginDTO implements Login {
  @t
  email!: string;

  @t
  password!: string;
}
