import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../validators';

@ArgsType()
@InputType()
export class CharacterId {
  @Field()
  @IsCustomId('CHR')
  id: string;
}
