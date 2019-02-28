import { ApiModelProperty } from '@nestjs/swagger';

import { IsId } from '@Decorators/index';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class SkillDTO {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsId('00S', { message: 'Invalid skill id.' })
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
