import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Message {
  @Field({ nullable: true })
  message: string;
}
