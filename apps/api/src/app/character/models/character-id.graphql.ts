import { f } from '@marcj/marshal';
import { CharacterId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class CharacterIdDTO implements CharacterId {
  @f.validator(CustomId('CHR'))
  id!: string;
}
