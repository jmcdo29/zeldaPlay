import { ApiModelProperty } from '@nestjs/swagger';

export class JwtReturnDTO {
  @ApiModelProperty()
  accessToken: string;
  @ApiModelProperty()
  id: string;
}
