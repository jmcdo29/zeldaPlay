import { CharacterInsertData } from '@tabletop-companion/api-interface';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IsCustomId } from '../../validators';

export class CharacterInsertDataDTO implements CharacterInsertData {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  race!: string;

  @IsString()
  subrace!: string;

  @IsNumber()
  @Min(0)
  experience!: number;

  @IsNumber()
  @Min(1)
  maxHealth!: number;

  @IsNumber()
  @Min(0)
  health!: number;

  @IsBoolean()
  @IsOptional()
  isDead = false;

  @IsCustomId('USR')
  playerId!: string;

  @IsNumber()
  @Min(1)
  level = 1;

  @IsString()
  @IsNotEmpty()
  alignment!: string;

  @IsString()
  @IsNotEmpty()
  background!: string;

  @IsString()
  @IsNotEmpty()
  ideal!: string;

  @IsString()
  @IsNotEmpty()
  bond!: string;

  @IsString()
  @IsNotEmpty()
  flaw!: string;

  @IsArray()
  @ArrayNotEmpty()
  personalityTraits!: string[];

  @IsArray()
  @ArrayNotEmpty()
  proficiencies!: string[];

  @IsArray()
  @ArrayNotEmpty()
  languages!: string[];

  @IsString()
  @IsNotEmpty()
  game = 'dd5';
}
