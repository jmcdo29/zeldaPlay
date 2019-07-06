import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../validators';

@InputType()
@ArgsType()
export class CharacterId {
  @Field()
  @IsCustomId('CHR')
  id: string;
}
