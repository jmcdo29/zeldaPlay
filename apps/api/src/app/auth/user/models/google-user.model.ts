import { t } from '@deepkit/type';

export class GoogleUser {
  @t
  id: string;
  @t
  email: string;
  @t
  firstName: string;
  @t
  lastName: string;
  @t.array(String)
  roles: string[] = ['player'];
  @t
  googleId: string;
}
