import { UserUpdateData } from '@tabletop-companion/api-interface';
import {
  ArrayContains,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsCustomId } from '../../../validators';

export class UserUpdateDataDTO implements UserUpdateData {
  @IsCustomId('USR')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  consentToEmail?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayContains(['player', 'dm', 'admin'])
  role?: string[];
}
