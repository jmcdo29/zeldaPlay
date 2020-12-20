import { t } from '@deepkit/type';
import { UserId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../../validators';

export class UserIdDTO implements UserId {
  @t.validator(CustomId('USR'))
  readonly id!: string;
}
