import { t } from '@deepkit/type';
import { AbilityScoreUpdate } from '@tabletop-companion/api-interface';
import { AbilityScoreValidator, CustomId } from '../../validators';

export class AbilityScoreUpdateDTO implements AbilityScoreUpdate {
  @t.validator(CustomId('ABL'))
  id!: string;

  @t.validator(AbilityScoreValidator)
  value!: number;
}
