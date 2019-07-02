import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { IsCustomId } from '../validators';
import { AbilityScore } from './abilityScore';

@InputType()
export class AbilityScoreInput implements Partial<AbilityScore> {
  @Field((type) => Int)
  @IsNumber()
  @Min(1)
  @Max(20)
  value: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsCustomId('CHR')
  @IsNotEmpty()
  characterId: string;
}
