import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { IsCustomId } from '../validators';
import { AbilityScore } from './abilityScore';

@InputType()
export class AbilityScoreUpdate implements Partial<AbilityScore> {
  @Field()
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field((type) => Int)
  @Max(20)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
