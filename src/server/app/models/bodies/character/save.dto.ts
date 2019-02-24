import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches
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
  @Matches(/^0St\w{9}$/)
  readonly id?: string;
}
