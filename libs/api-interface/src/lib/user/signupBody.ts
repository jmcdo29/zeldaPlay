import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { IsPassword } from '../validators';

export class SignupBody {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsPassword()
  confirmationPassword: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  consentToEmail = false;

  @IsIn(['player', 'admin', 'dm'])
  @IsOptional()
  role = ['player'];
}
