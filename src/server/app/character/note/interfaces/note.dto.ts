import { ApiModelProperty } from '@nestjs/swagger';

export class NoteDTO {
  @ApiModelProperty()
  message: string;

  @ApiModelProperty()
  time: string;

  @ApiModelProperty()
  id?: string;

  @ApiModelProperty()
  important: boolean;
}
