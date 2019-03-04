import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Modifier } from './enums/index';

export class DbSkill {
  @ApiResponseModelProperty({ type: 'string', example: '0St7Qmonehsx' })
  skId: string;
  @ApiResponseModelProperty({ type: 'number', example: 0 })
  skItemModifier: number;
  @ApiResponseModelProperty({ type: 'number', example: 0 })
  skMiscModifier: number;
  @ApiResponseModelProperty({ type: Modifier, example: 'Dexterity' })
  skModifier: Modifier;
  @ApiResponseModelProperty({ type: 'string', example: 'Acrobatics' })
  skName: string;
  @ApiResponseModelProperty({ type: 'number', example: 0 })
  skRacialModifier: number;
  @ApiResponseModelProperty({ type: 'number', example: 0 })
  skRanks: number;
  @ApiResponseModelProperty({ type: 'boolean', example: false })
  skTrained: boolean;
  @ApiResponseModelProperty({
    type: 'magic' || 'skill' || 'weapon',
    example: 'skill'
  })
  skType: 'magic' | 'skill' | 'weapon';
}
