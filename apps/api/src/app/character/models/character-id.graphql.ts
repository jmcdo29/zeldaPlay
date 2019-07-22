import { CharacterId } from '@tabletop-companion/api-interface';
import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../../validators';

@InputType()
@ArgsType()
export class CharacterIdDTO implements CharacterId {
  @Field()
  @IsCustomId('CHR')
  id: string;
}
