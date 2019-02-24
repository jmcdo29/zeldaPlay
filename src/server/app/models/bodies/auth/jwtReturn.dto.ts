import { ApiResponseModelProperty } from '@nestjs/swagger';

export class JwtReturnDTO {
  @ApiResponseModelProperty()
  accessToken: string;
  @ApiResponseModelProperty()
  id: string;
}
