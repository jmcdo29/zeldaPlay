import { t } from '@deepkit/type';
import { UserUpdateData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../../validators';

export class UserUpdateDataDTO implements UserUpdateData {
  @t.validator(CustomId('USR'))
  id!: string;

  @t.optional
  email?: string;

  @t.optional
  firstName?: string;

  @t.optional
  lastName?: string;

  @t.optional
  consentToEmail?: boolean;

  @(t.array(String).optional)
  role?: string[];
}
