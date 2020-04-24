import { Auth } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthDTO implements Auth {
  @Field()
  id!: string;
}
