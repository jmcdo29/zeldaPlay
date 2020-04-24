import { AbilityScoreInput } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { IsCustomId } from '../../validators';

export class AbilityScoreInputDTO implements AbilityScoreInput {
  @IsNumber()
  @Min(1)
  @Max(20)
  value!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsCustomId('CHR')
  @IsNotEmpty()
  characterId!: string;
}
