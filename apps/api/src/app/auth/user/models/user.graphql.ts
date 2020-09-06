import { User } from '@tabletop-companion/api-interface';
import { f } from '@marcj/marshal';

export class UserDTO implements User {
  @f
  id!: string;
  @f
  email!: string;
  @f
  password!: string;
  @f
  firstName!: string;
  @f
  lastName!: string;
  @f.optional()
  consentToEmail: boolean = false;
  @f.optional()
  recoveryToken?: string;
  @f.optional()
  isActive: boolean = true;
  @(f.array(String).optional())
  role: string[] = ['player'];
}
