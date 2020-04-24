import { User } from '@tabletop-companion/api-interface';

export class UserDTO implements User {
  id!: string;

  email!: string;

  password!: string;

  firstName!: string;

  lastName!: string;

  consentToEmail = false;

  recoveryToken?: string;

  isActive = true;

  role: string[] = ['player'];
}
