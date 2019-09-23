import { Auth } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthDTO implements Auth {
  @Field()
  id!: string;

  @Field()
  token!: string;
}
