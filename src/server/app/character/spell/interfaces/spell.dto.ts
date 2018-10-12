import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class SpellDTO {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly effect: string;

  @ApiModelProperty()
  readonly mpUse: number;

  @ApiModelProperty()
  readonly damage: number;

  @ApiModelProperty()
  readonly multiplier: number;

  @ApiModelPropertyOptional()
  readonly modifier?: string;

  @ApiModelProperty()
  readonly diety: string;

  @ApiModelProperty()
  readonly useDiety = false;

  @ApiModelPropertyOptional()
  readonly id?: string;
}
