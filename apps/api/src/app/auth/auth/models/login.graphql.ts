import { Login } from '@tabletop-companion/api-interface';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO implements Login {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
