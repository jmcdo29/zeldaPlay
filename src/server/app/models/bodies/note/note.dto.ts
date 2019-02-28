import { ApiModelProperty } from '@nestjs/swagger';

import { IsId } from '@Decorators/index';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class NoteDTO {
  @ApiModelProperty()
  @IsString()
  readonly msg: string;

  @ApiModelProperty()
  readonly time: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsId('00N', { message: 'Invalid note id.' })
  readonly id?: string;

  @ApiModelProperty()
  @IsBoolean()
  readonly important: boolean;
}
