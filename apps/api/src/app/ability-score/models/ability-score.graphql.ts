import { AbilityScore } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { typeInt } from '../../models';

@ObjectType()
export class AbilityScoreDTO implements AbilityScore {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field(typeInt)
  value!: number;

  @Field()
  characterId!: string;
}
