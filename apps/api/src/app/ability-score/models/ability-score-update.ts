import { AbilityScoreUpdate } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { typeInt } from '../../models';
import { IsCustomId } from '../../validators';

@InputType()
export class AbilityScoreUpdateDTO implements AbilityScoreUpdate {
  @Field()
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Field(typeInt)
  @Max(20)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  value!: number;
}
