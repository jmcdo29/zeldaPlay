import { IsArray, IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { Character } from './character';

const nullable = { nullable: true };

const intType = (type) => Int;

@InputType()
export class CharacterUpdateData implements Partial<Character> {
  @Field(intType, nullable)
  @IsNumber()
  @IsOptional()
  experience?: number;

  @Field(intType, nullable)
  @IsNumber()
  @IsOptional()
  maxHealth?: number;

  @Field(intType, nullable)
  @IsNumber()
  @IsOptional()
  health?: number;

  @Field((type) => Boolean, nullable)
  @IsBoolean()
  @IsOptional()
  isDead?: boolean;

  @Field(intType, nullable)
  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsArray()
  @IsOptional()
  proficiencies?: string[];
}
