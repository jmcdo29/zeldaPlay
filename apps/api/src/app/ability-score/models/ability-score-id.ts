import { AbilityScoreId } from '@tabletop-companion/api-interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../../validators';

@InputType()
@ArgsType()
export class AbilityScoreIdDTO implements AbilityScoreId {
  @Field()
  @IsCustomId('ABL')
  @IsNotEmpty()
  @IsString()
  id: string;
}
