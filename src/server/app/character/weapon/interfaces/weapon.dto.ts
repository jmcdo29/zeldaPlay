import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class WeaponDTO {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  attack: number; // Number of sides the damage dice has

  @ApiModelProperty()
  numberOfAttacks: number; // For the in case you have multiple attack dice

  @ApiModelProperty()
  critRange: number[]; // Values for which rolling a crit leads to crit damage

  @ApiModelProperty()
  critDamage: number; // Crit damage multiplier

  @ApiModelProperty()
  type: string;

  @ApiModelProperty()
  modifier: string;

  @ApiModelProperty()
  range: number;

  @ApiModelPropertyOptional()
  ammo?: number;

  @ApiModelPropertyOptional()
  id?: string;
}
