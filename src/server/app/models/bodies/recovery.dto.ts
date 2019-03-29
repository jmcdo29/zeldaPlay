import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Recovery {
  @ApiModelProperty()
  @IsString()
  readonly question: string;

  @ApiModelProperty()
  @IsString()
  readonly answer: string;
}
