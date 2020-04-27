import { CharacterId } from '@tabletop-companion/api-interface';
import { IsCustomId } from '../../validators';

export class CharacterIdDTO implements CharacterId {
  @IsCustomId('CHR')
  id!: string;
}
