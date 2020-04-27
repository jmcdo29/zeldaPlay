import { UserId } from '@tabletop-companion/api-interface';
import { IsCustomId } from '../../../validators';

export class UserIdDTO implements UserId {
  @IsCustomId('USR')
  readonly id!: string;
}
