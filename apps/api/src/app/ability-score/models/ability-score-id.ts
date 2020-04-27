import { AbilityScoreId } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsCustomId } from '../../validators';

export class AbilityScoreIdDTO implements AbilityScoreId {
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id!: string;
}
