import { UserId } from '@tabletop-companion/api-interface';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsCustomId } from '../../../validators';

@InputType()
@ArgsType()
export class UserIdDTO implements UserId {
  @Field()
  @IsCustomId('USR')
  readonly id!: string;
}
