import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Modifier } from './enums/index';

export class DbSave {
  @ApiResponseModelProperty({ type: 'string', example: '00Sm3NWwokg3' })
  saId: string;
  @ApiResponseModelProperty({ type: Modifier, example: 'Dexterity' })
  saModifier: Modifier;
  @ApiResponseModelProperty({ type: 'string', example: 'Reflex' })
  saName: string;
  @ApiResponseModelProperty({ type: 'number', example: 2 })
  saRacialBonus: number;
}
