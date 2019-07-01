import { Field, InputType } from 'type-graphql';
import { User } from './user';

@InputType()
export class UserUpdateData implements Partial<User> {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => Boolean, { nullable: true })
  consentToEmail?: boolean;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  role?: string[];
}
