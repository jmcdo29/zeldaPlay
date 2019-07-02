import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { AbilityScore } from './abilityScore';

@InputType()
export class AbilityScoreUpdate implements Partial<AbilityScore> {
  @Field((type) => Int)
  @Max(20)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
