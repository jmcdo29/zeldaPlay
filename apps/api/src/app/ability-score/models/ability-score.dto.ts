import { t } from '@deepkit/type';
import { AbilityScore } from '@tabletop-companion/api-interface';
import { AbilityScoreValidator, CustomId } from '../../validators';

export class AbilityScoreDTO implements AbilityScore {
  @t.validator(CustomId('ABL'))
  id!: string;
  @t
  name!: string;
  @t.validator(AbilityScoreValidator)
  value!: number;
  @t.validator(CustomId('CHR'))
  characterId!: string;
}
