import { ApiModelProperty } from '@nestjs/swagger';

export class SkillDTO {
  @ApiModelProperty()
  readonly id?: string;

  @ApiModelProperty()
  readonly skillName: string;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly ranks: number;

  @ApiModelProperty()
  readonly trained: boolean;

  @ApiModelProperty()
  readonly racial?: number;

  @ApiModelProperty()
  readonly misc?: number;

  @ApiModelProperty()
  readonly item?: number;

  @ApiModelProperty()
  readonly modifier?: string;
}
