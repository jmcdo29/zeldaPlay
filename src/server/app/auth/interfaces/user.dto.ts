import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
}
