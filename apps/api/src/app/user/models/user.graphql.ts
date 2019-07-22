import { User } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserDTO implements User {
  @Field()
  id: string;

  @Field()
  email: string;

  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Boolean)
  consentToEmail = false;

  recoveryToken: string;

  @Field((type) => Boolean)
  isActive = true;

  @Field((type) => [String])
  role: string[] = ['player'];
}
