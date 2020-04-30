import { f } from '@marcj/marshal';
import { UserUpdateData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../../validators';

export class UserUpdateDataDTO implements UserUpdateData {
  @f.validator(CustomId('USR'))
  id!: string;

  @f.optional()
  email?: string;

  @f.optional()
  firstName?: string;

  @f.optional()
  lastName?: string;

  @f.optional()
  consentToEmail?: boolean;

  @(f.array(String).optional())
  role?: string[];
}
