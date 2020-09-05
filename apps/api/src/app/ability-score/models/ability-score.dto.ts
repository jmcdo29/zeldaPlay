import { f } from '@marcj/marshal';
import { AbilityScore } from '@tabletop-companion/api-interface';
import { AbilityScoreValidator, CustomId } from '../../validators';

export class AbilityScoreDTO implements AbilityScore {
  @f.validator(CustomId('ABL'))
  id!: string;
  @f
  name!: string;
  @f.validator(AbilityScoreValidator)
  value!: number;
  @f.validator(CustomId('CHR'))
  characterId!: string;
}
