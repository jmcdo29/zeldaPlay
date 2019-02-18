import { ApiModelProperty } from '@nestjs/swagger';

import { Recovery } from './recovery.dto';

export class NewUserDTO {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly confirmationPassword: string;
  @ApiModelProperty({ type: [Recovery] })
  readonly recovery: Recovery[];
}
