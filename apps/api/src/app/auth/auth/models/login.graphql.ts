import { f } from '@marcj/marshal';
import { Login } from '@tabletop-companion/api-interface';

export class LoginDTO implements Login {
  @f
  email!: string;

  @f
  password!: string;
}
