import { CharacterInsertData } from '@tabletop-companion/api-interface';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { nullable, typeBoolean, typeInt, typeStrings } from '../../models';
import { IsCustomId } from '../../validators';

@InputType()
export class CharacterInsertDataDTO implements CharacterInsertData {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  race!: string;

  @Field(nullable)
  @IsString()
  subrace!: string;

  @Field(typeInt)
  @IsNumber()
  @Min(0)
  experience!: number;

  @Field(typeInt)
  @IsNumber()
  @Min(1)
  maxHealth!: number;

  @Field(typeInt)
  @IsNumber()
  @Min(0)
  health!: number;

  @Field(typeBoolean, nullable)
  @IsBoolean()
  @IsOptional()
  isDead = false;

  @Field()
  @IsCustomId('USR')
  playerId!: string;

  @Field(typeInt)
  @IsNumber()
  @Min(1)
  level = 1;

  @Field()
  @IsString()
  @IsNotEmpty()
  alignment!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  background!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  ideal!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  bond!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  flaw!: string;

  @Field(typeStrings)
  @IsArray()
  @ArrayNotEmpty()
  personalityTraits!: string[];

  @Field(typeStrings)
  @IsArray()
  @ArrayNotEmpty()
  proficiencies!: string[];

  @Field(typeStrings)
  @IsArray()
  @ArrayNotEmpty()
  languages!: string[];

  @Field(typeStrings)
  @IsString()
  @IsNotEmpty()
  game = 'dd5';
}
