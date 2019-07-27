import { Signup } from '@tabletop-companion/api-interface';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { typeBoolean, typeStrings } from '../../models';
import { IsPassword } from '../../validators';

@InputType()
export class SignupDTO implements Signup {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsPassword()
  @Field()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsPassword()
  @Field()
  confirmationPassword!: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName!: string;

  @IsBoolean()
  @IsOptional()
  @Field(typeBoolean)
  consentToEmail = false;

  @IsOptional()
  @Field(typeStrings, { nullable: true })
  role: string[] = ['player'];
}
