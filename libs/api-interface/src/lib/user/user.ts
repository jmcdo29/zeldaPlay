import { IsArray, IsBoolean, IsEmail, IsIn, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { IsCustomId } from '../validators';

@ObjectType()
export class User {
  @Field()
  @IsCustomId('USR')
  id: string;

  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field((type) => Boolean)
  @IsBoolean()
  consentToEmail = false;

  @Field()
  @IsString()
  recoveryToken: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isActive = true;

  @Field((type) => [String])
  @IsArray()
  @IsIn(['player', 'dm', 'admin'])
  role: string[] = ['player'];
}
