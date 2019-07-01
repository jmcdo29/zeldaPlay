import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Character {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  race: string;

  @Field({ nullable: true })
  subrace: string;

  @Field((type) => Int)
  experience: number;

  @Field((type) => Int)
  maxHealth: number;

  @Field((type) => Int)
  health: number;

  @Field((type) => Boolean, { nullable: true })
  isDead = false;

  @Field()
  playerId: string;

  @Field((type) => Int)
  level = 1;

  @Field()
  alignment: string;

  @Field()
  background: string;

  @Field()
  ideal: string;

  @Field()
  bond: string;

  @Field()
  flaw: string;

  @Field((type) => [String])
  personalityTraits: string[];

  @Field((type) => [String])
  proficiencies: string[];

  @Field((type) => [String])
  languages: string[];

  @Field((type) => String)
  game = 'dd5';
}
