import { IsCustomId } from '../validators';

export class UserId {
  @IsCustomId('USR')
  readonly id: string;
}
