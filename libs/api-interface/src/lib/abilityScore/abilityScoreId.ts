import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../validators';

@InputType()
@ArgsType()
export class AbilityScoreId {
  @Field()
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id: string;
}
