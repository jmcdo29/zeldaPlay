import { f } from '@marcj/marshal';
import { AbilityScoreId } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class AbilityScoreIdDTO implements AbilityScoreId {
  @f.validator(CustomId('ABL'))
  id!: string;
}
