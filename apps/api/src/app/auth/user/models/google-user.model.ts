import { f } from '@marcj/marshal';

export class GoogleUser {
  @f
  id: string;
  @f
  email: string;
  @f
  firstName: string;
  @f
  lastName: string;
  @f.array(String)
  roles: string[] = ['player'];
  @f
  googleId: string;
}
