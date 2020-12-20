import { t } from '@deepkit/type';
import { Auth } from '@tabletop-companion/api-interface';

export class AuthDTO implements Auth {
  @t
  id!: string;
}
