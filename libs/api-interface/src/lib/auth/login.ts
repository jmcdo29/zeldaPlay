import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class Login {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
