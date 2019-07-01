import { ArgsType, Field, InputType } from 'type-graphql';
import { IsCustomId } from '../validators';

@InputType()
@ArgsType()
export class UserId {
  @Field()
  @IsCustomId('USR')
  readonly id: string;
}
