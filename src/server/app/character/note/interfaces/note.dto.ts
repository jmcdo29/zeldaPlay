import { ApiModelProperty } from '@nestjs/swagger';

export class NoteDTO {
  @ApiModelProperty()
  msg: string;

  @ApiModelProperty()
  time: string;

  @ApiModelProperty()
  id?: string;

  @ApiModelProperty()
  important: boolean;
}
