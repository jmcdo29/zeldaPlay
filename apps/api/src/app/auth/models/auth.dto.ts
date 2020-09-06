import { f } from '@marcj/marshal';
import { Auth } from '@tabletop-companion/api-interface';

export class AuthDTO implements Auth {
  @f
  id!: string;
}
