import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min
} from 'class-validator';

export class WeaponDTO {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  @IsIn([4, 6, 8, 10, 12])
  readonly attack: number; // Number of sides the damage dice has

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly numberOfAttacks: number; // For the in case you have multiple attack dice

  @ApiModelProperty()
  @IsString()
  readonly critRange: string; // Values for which rolling a crit leads to crit damage

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  readonly critDamage: number; // Crit damage multiplier

  @ApiModelProperty()
  @IsString()
  readonly type: string;

  @ApiModelProperty()
  @IsString()
  @IsIn([
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ])
  readonly modifier: string;

  @ApiModelProperty()
  @IsNumber()
  @Min(0)
  readonly range: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly ammo?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^00W\w{9}$/)
  readonly id?: string;
}
