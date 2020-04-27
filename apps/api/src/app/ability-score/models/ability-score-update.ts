import { AbilityScoreUpdate } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { IsCustomId } from '../../validators';

export class AbilityScoreUpdateDTO implements AbilityScoreUpdate {
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Max(20)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  value!: number;
}
