import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class SaveDTO {
  @ApiModelProperty()
  readonly racial: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly modifier: string;

  @ApiModelPropertyOptional()
  readonly id?: string;
}
