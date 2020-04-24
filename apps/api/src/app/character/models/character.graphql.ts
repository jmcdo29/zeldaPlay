import { Character } from '@tabletop-companion/api-interface';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  nullable,
  typeBoolean,
  typeInt,
  typeString,
  typeStrings,
} from '../../models';

@ObjectType()
export class CharacterDTO implements Character {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  race!: string;

  @Field(nullable)
  subrace!: string;

  @Field(typeInt)
  experience!: number;

  @Field(typeInt)
  maxHealth!: number;

  @Field(typeInt)
  health!: number;

  @Field(typeBoolean, nullable)
  isDead = false;

  @Field()
  playerId!: string;

  @Field(typeInt)
  level = 1;

  @Field()
  alignment!: string;

  @Field()
  background!: string;

  @Field()
  ideal!: string;

  @Field()
  bond!: string;

  @Field()
  flaw!: string;

  @Field(typeStrings)
  personalityTraits!: string[];

  @Field(typeStrings)
  proficiencies!: string[];

  @Field(typeStrings)
  languages!: string[];

  @Field(typeString)
  game = 'dd5';
}
