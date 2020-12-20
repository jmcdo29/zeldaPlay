import { t } from '@deepkit/type';
import { Signup } from '@tabletop-companion/api-interface';
import { IsEmail, IsPassword } from '../../validators';

export class SignupDTO implements Signup {
  @t.validator(IsEmail)
  email!: string;

  @t.validator(IsPassword)
  password!: string;

  @t.validator(IsPassword)
  confirmationPassword!: string;

  @t
  firstName!: string;

  @t
  lastName!: string;

  @t
  consentToEmail: boolean = false;

  @(t.array(String).optional)
  role: string[] = ['player'];
}
