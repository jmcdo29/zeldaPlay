import { f } from '@marcj/marshal';
import { CharacterUpdateData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators/isCustomId';

export class CharacterUpdateDataDTO implements CharacterUpdateData {
  @f.validator(CustomId('CHR'))
  id!: string;

  @f.optional()
  experience?: number;

  @f.optional()
  maxHealth?: number;

  @f.optional()
  health?: number;

  @f.optional()
  isDead?: boolean;

  @f.optional()
  level?: number;

  @(f.array(String).optional())
  languages?: string[];

  @(f.array(String).optional())
  proficiencies?: string[];
}
