import { AbilityScoreInput } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { IsCustomId } from '../../validators';

@InputType()
export class AbilityScoreInputDTO implements AbilityScoreInput {
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
