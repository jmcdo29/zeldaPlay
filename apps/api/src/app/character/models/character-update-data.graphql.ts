import { CharacterUpdateData } from '@tabletop-companion/api-interface';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { nullable, typeBoolean, typeInt, typeStrings } from '../../models';
import { IsCustomId } from '../../validators/isCustomId';

@InputType()
export class CharacterUpdateDataDTO implements CharacterUpdateData {
  @Field()
  @IsCustomId('CHR')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Field(typeInt, nullable)
  @IsNumber()
  @IsOptional()
  experience?: number;

  @Field(typeInt, nullable)
  @IsNumber()
  @IsOptional()
  maxHealth?: number;

  @Field(typeInt, nullable)
  @IsNumber()
  @IsOptional()
  health?: number;

  @Field(typeBoolean, nullable)
  @IsBoolean()
  @IsOptional()
  isDead?: boolean;

  @Field(typeInt, nullable)
  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @Field(typeStrings, { nullable: 'itemsAndList' })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @Field(typeStrings, { nullable: 'itemsAndList' })
  @IsArray()
  @IsOptional()
  proficiencies?: string[];
}
