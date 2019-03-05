import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { IsId } from '@Decorators/index';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class SaveDTO {
  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly racial: number;

  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsString()
  @IsIn(['Dexterity', 'Constitution', 'Wisom'])
  readonly modifier: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @IsId('0St', { message: 'Invalid save id.' })
  readonly id?: string;
}
