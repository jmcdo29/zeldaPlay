import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min
} from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { IsCustomId } from '../validators';

@ObjectType()
export class Character {
  @Field()
  @IsCustomId('CHR')
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  race: string;

  @Field({ nullable: true })
  @IsString()
  subrace: string;

  @Field((type) => Int)
  @IsNumber()
  @Min(0)
  experience: number;

  @Field((type) => Int)
  @IsNumber()
  @Min(1)
  maxHealth: number;

  @Field((type) => Int)
  @IsNumber()
  @Min(0)
  health: number;

  @Field((type) => Boolean)
  @IsBoolean()
  isDead = false;

  @Field()
  @IsCustomId('USR')
  playerId: string;

  @Field((type) => Int)
  @IsNumber()
  @Min(1)
  level = 1;

  @Field()
  @IsString()
  @IsNotEmpty()
  alignment: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  background: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  ideal: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  bond: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  flaw: string;

  @Field((type) => [String])
  @IsArray()
  @ArrayNotEmpty()
  personalityTraits: string[];

  @Field((type) => [String])
  @IsArray()
  @ArrayNotEmpty()
  proficiencies: string[];

  @Field((type) => [String])
  @IsArray()
  @ArrayNotEmpty()
  languages: string[];

  @Field((type) => String)
  @IsString()
  @IsNotEmpty()
  game = 'dd5';
}
