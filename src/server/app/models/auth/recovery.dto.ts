import { ApiModelProperty } from '@nestjs/swagger';

export class Recovery {
  @ApiModelProperty()
  readonly question: string;
  @ApiModelProperty()
  readonly answer: string;
}
