import { User } from '@tabletop-companion/api-interface';
import { t } from '@deepkit/type';

export class UserDTO implements User {
  @t
  id!: string;
  @t
  email!: string;
  @t
  password!: string;
  @t
  firstName!: string;
  @t
  lastName!: string;
  @t.optional
  consentToEmail: boolean = false;
  @t.optional
  recoveryToken?: string;
  @t.optional
  isActive: boolean = true;
  @(t.array(String).optional)
  role: string[] = ['player'];
}
