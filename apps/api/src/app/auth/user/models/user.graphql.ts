import { User } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { typeBoolean, typeStrings } from '../../../models';

@ObjectType()
export class UserDTO implements User {
  @Field()
  id!: string;

  @Field()
  email!: string;

  password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field(typeBoolean)
  consentToEmail = false;

  recoveryToken?: string;

  @Field(typeBoolean)
  isActive = true;

  @Field(typeStrings)
  role: string[] = ['player'];
}
