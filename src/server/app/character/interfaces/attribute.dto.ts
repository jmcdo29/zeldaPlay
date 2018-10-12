import { ApiModelProperty } from '@nestjs/swagger';

export class AttributeDTO {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly value: number;

  @ApiModelProperty()
  readonly modifier: number;
}
