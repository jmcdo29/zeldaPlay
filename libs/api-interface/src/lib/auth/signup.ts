import {
  ArrayContains,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsPassword } from '../validators';

@InputType()
export class Signup {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsPassword()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsPassword()
  @Field()
  confirmationPassword: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  @Field((type) => Boolean)
  consentToEmail = false;

  @IsOptional()
  @Field((type) => [String], { nullable: true })
  role: string[] = ['player'];
}
