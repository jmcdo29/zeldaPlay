import { ApiModelProperty } from '@nestjs/swagger';

export class NoteDTO {
  @ApiModelProperty()
  readonly msg: string;

  @ApiModelProperty()
  readonly time: string;

  @ApiModelProperty()
  readonly id?: string;

  @ApiModelProperty()
  readonly important: boolean;
}
