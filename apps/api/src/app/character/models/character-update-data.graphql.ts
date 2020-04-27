import { CharacterUpdateData } from '@tabletop-companion/api-interface';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IsCustomId } from '../../validators/isCustomId';

export class CharacterUpdateDataDTO implements CharacterUpdateData {
  @IsCustomId('CHR')
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsNumber()
  @IsOptional()
  maxHealth?: number;

  @IsNumber()
  @IsOptional()
  health?: number;

  @IsBoolean()
  @IsOptional()
  isDead?: boolean;

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsArray()
  @IsOptional()
  languages?: string[];

  @IsArray()
  @IsOptional()
  proficiencies?: string[];
}
