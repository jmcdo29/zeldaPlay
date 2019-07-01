import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Auth {
  @Field()
  id: string;

  @Field()
  token: string;
}
