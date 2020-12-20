import { t } from '@deepkit/type';
import { AbilityScoreInput } from '@tabletop-companion/api-interface';
import { AbilityScoreValidator, CustomId } from '../../validators';

export class AbilityScoreInputDTO implements AbilityScoreInput {
  @t.validator(AbilityScoreValidator)
  value!: number;

  @t
  name!: string;

  @t.validator(CustomId('CHR'))
  characterId!: string;
}
