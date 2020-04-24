import { Signup } from '@tabletop-companion/api-interface';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPassword } from '../../../validators';

export class SignupDTO implements Signup {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsPassword()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsPassword()
  confirmationPassword!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsBoolean()
  @IsOptional()
  consentToEmail = false;

  @IsOptional()
  role: string[] = ['player'];
}
