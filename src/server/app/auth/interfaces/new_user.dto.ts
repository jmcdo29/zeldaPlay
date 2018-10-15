import { ApiModelProperty } from '@nestjs/swagger';

export class NewUserDTO {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly confirmationPassword: string;
}
