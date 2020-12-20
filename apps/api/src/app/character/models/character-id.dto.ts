import { t } from '@deepkit/type';
import { CharacterId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class CharacterIdDTO implements CharacterId {
  @t.validator(CustomId('CHR'))
  id!: string;
}
