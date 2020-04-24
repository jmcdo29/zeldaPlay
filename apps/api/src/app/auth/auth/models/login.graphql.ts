import { Login } from '@tabletop-companion/api-interface';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginDTO implements Login {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
