import { t } from '@deepkit/type';
import { CharacterUpdateData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators/isCustomId';

export class CharacterUpdateDataDTO implements CharacterUpdateData {
  @t.validator(CustomId('CHR'))
  id!: string;

  @t.optional
  experience?: number;

  @t.optional
  maxHealth?: number;

  @t.optional
  health?: number;

  @t.optional
  isDead?: boolean;

  @t.optional
  level?: number;

  @(t.array(String).optional)
  languages?: string[];

  @(t.array(String).optional)
  proficiencies?: string[];
}
