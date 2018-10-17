import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class WeaponDTO {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly attack: number; // Number of sides the damage dice has

  @ApiModelProperty()
  readonly numberOfAttacks: number; // For the in case you have multiple attack dice

  @ApiModelProperty()
  readonly critRange: number[]; // Values for which rolling a crit leads to crit damage

  @ApiModelProperty()
  readonly critDamage: number; // Crit damage multiplier

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly modifier: string;

  @ApiModelProperty()
  readonly range: number;

  @ApiModelPropertyOptional()
  readonly ammo?: number;

  @ApiModelPropertyOptional()
  readonly id?: string;
}
