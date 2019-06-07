import { IsArray, IsBoolean, IsEmail, IsIn, IsString } from 'class-validator';
import { IsCustomId } from '../validators';

export class User {
  @IsCustomId('USR')
  id: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  consentToEmail = false;

  @IsString()
  recoveryToken: string;

  @IsBoolean()
  isActive = true;

  @IsArray()
  @IsIn(['player', 'dm', 'admin'])
  role: string[] = ['player'];
}
