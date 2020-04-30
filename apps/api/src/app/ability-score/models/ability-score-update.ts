import { f } from '@marcj/marshal';
import { AbilityScoreUpdate } from '@tabletop-companion/api-interface';
import { AbilityScoreValidator, CustomId } from '../../validators';

export class AbilityScoreUpdateDTO implements AbilityScoreUpdate {
  @f.validator(CustomId('ABL'))
  id!: string;

  @f.validator(AbilityScoreValidator)
  value!: number;
}
