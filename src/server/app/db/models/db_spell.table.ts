import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Modifier } from './enums/index';

export class DbSpell {
  @ApiResponseModelProperty({ type: 'string', example: '0SpPRr8azXow' })
  spId: string;
  @ApiResponseModelProperty({ type: 'number', example: 8 })
  spDamage: number;
  @ApiResponseModelProperty({
    type: 'Din' || 'Farore' || 'Nayru',
    example: 'Nayru'
  })
  spDiety: 'Din' | 'Farore' | 'Nayru';
  @ApiResponseModelProperty({ type: 'string', example: 'Heals target' })
  spEffect: string;
  @ApiResponseModelProperty({ type: Modifier, example: 'Wisdom' })
  spModifier: Modifier;
  @ApiResponseModelProperty({ type: 'number', example: 5 })
  spMpUse: number;
  @ApiResponseModelProperty({ type: 'string', example: 'Fairy Cure' })
  spName: string;
  @ApiResponseModelProperty({ type: 'boolean', example: false })
  spUseDiety: boolean;
  @ApiResponseModelProperty({ type: 'number', example: 1 })
  spNumberOfHits: number;
}
