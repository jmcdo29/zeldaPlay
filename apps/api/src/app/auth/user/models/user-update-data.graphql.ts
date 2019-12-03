import { UserUpdateData } from '@tabletop-companion/api-interface';
import {
  ArrayContains,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { nullable, typeBoolean, typeStrings } from '../../../models';
import { IsCustomId } from '../../../validators';

@InputType()
export class UserUpdateDataDTO implements UserUpdateData {
  @Field()
  @IsCustomId('USR')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Field(nullable)
  @IsOptional()
  @IsString()
  email?: string;

  @Field(nullable)
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field(nullable)
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field(typeBoolean, nullable)
  @IsOptional()
  @IsBoolean()
  consentToEmail?: boolean;

  @Field(typeStrings, { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @ArrayContains(['player', 'dm', 'admin'])
  role?: string[];
}
