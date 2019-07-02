import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class AbilityScore {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  value: number;

  @Field()
  characterId: string;
}
