import { User } from './user';

export interface UserUpdateData extends Partial<User> {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  consentToEmail?: boolean;
  role?: string[];
}
