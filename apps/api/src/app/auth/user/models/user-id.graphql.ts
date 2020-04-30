import { f } from '@marcj/marshal';
import { UserId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../../validators';

export class UserIdDTO implements UserId {
  @f.validator(CustomId('USR'))
  readonly id!: string;
}
