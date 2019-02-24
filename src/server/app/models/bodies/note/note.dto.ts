import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class NoteDTO {
  @ApiModelProperty()
  @IsString()
  readonly msg: string;

  @ApiModelProperty()
  readonly time: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Matches(/^00N\w{9}$/)
  readonly id?: string;

  @ApiModelProperty()
  @IsBoolean()
  readonly important: boolean;
}
