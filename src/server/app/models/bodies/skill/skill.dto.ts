import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches
} from 'class-validator';

export class SkillDTO {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Matches(/^00S\w{9}$/)
  readonly id?: string;

  @ApiModelProperty()
  @IsString()
  readonly skillName: string;

  @ApiModelProperty()
  @IsString()
  readonly type: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly ranks: number;

  @ApiModelProperty()
  @IsBoolean()
  readonly trained: boolean;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly racial?: number;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly misc?: number;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly item?: number;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsIn([
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ])
  readonly modifier?: string;
}
