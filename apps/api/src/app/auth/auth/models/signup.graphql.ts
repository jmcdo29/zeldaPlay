import { f } from '@marcj/marshal';
import { Signup } from '@tabletop-companion/api-interface';
import { IsEmail, IsPassword } from '../../../validators';

export class SignupDTO implements Signup {
  @f.validator(IsEmail)
  email!: string;

  @f.validator(IsPassword)
  password!: string;

  @f.validator(IsPassword)
  confirmationPassword!: string;

  @f
  firstName!: string;

  @f
  lastName!: string;

  @f
  consentToEmail: boolean = false;

  @f.array(String).optional()
  role: string[] = ['player'];
}
