import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginBody {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
