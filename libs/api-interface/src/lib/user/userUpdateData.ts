import {
  ArrayContains,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsCustomId } from '../validators';
import { User } from './user';

@InputType()
export class UserUpdateData implements Partial<User> {
  @Field()
  @IsCustomId('USR')
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  consentToEmail?: boolean;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @ArrayContains(['player', 'dm', 'admin'])
  role?: string[];
}
