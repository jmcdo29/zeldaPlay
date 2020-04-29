import { f } from '@marcj/marshal';
import { AbilityScoreInput } from '@tabletop-companion/api-interface';
import { CustomId, AbilityScoreValidator } from '../../validators';

export class AbilityScoreInputDTO implements AbilityScoreInput {
  @f.validator(AbilityScoreValidator)
  value!: number;

  @f
  name!: string;

  @f.validator(CustomId('CHR'))
  characterId!: string;
}
