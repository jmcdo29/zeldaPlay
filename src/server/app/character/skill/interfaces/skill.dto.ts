import { ApiModelProperty } from '@nestjs/swagger';

export class SkillDTO {
  @ApiModelProperty()
  id?: string;

  @ApiModelProperty()
  skillName: string;

  @ApiModelProperty()
  type: string;

  @ApiModelProperty()
  ranks: number;

  @ApiModelProperty()
  trained: boolean;

  @ApiModelProperty()
  racial?: number;

  @ApiModelProperty()
  misc?: number;

  @ApiModelProperty()
  item?: number;

  @ApiModelProperty()
  modifier?: string;
}
