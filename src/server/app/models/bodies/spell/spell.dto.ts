import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { IsId } from '@Decorators/index';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class SpellDTO {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsString()
  readonly effect: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly mpUse: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly damage: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly multiplier: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['Intelligence', 'Wisdom', 'Charosma'])
  readonly modifier?: string;

  @ApiModelProperty()
  @IsString()
  @IsIn(['Din', 'Farore', 'Nayru'])
  readonly diety: string;

  @ApiModelProperty()
  @IsBoolean()
  readonly useDiety = false;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @IsId('0Sp', { message: 'Invalid spell id.' })
  readonly id?: string;
}
