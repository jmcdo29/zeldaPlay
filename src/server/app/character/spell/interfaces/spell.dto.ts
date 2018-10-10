import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class SpellDTO {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  effect: string;

  @ApiModelProperty()
  mpUse: number;

  @ApiModelProperty()
  damage: number;

  @ApiModelProperty()
  multiplier: number;

  @ApiModelPropertyOptional()
  modifier?: string;

  @ApiModelProperty()
  diety: string;

  @ApiModelProperty()
  useDiety = false;

  @ApiModelPropertyOptional()
  id?: string;
}
