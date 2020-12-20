import { t } from '@deepkit/type';
import { AbilityScoreId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class AbilityScoreIdDTO implements AbilityScoreId {
  @t.validator(CustomId('ABL'))
  id!: string;
}
