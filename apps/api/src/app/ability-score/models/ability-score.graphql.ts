import { AbilityScore } from '@tabletop-companion/api-interface';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class AbilityScoreDTO implements AbilityScore {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  value: number;

  @Field()
  characterId: string;
}
