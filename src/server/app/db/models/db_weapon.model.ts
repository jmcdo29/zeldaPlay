import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Modifier } from './enums/modifiers.enum';
import { WeaponType } from './enums/weapons.enum';

export class DbWeapon {
  @ApiResponseModelProperty({ type: 'string', example: '00WncnBgl1Fi' })
  wId: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Tornado Rod' })
  wName: string;
  @ApiResponseModelProperty({ type: Modifier, example: 'Wisdom' })
  wModifier: Modifier;
  @ApiResponseModelProperty({ type: 'number', example: null })
  wAmmo: number;
  @ApiResponseModelProperty({ type: 'number', example: 30 })
  wRange: number;
  @ApiResponseModelProperty({ type: 'number', example: 3 })
  wCritDamage: number;
  @ApiResponseModelProperty({ type: 'string', example: '18 - 20' })
  wCritRange: string;
  @ApiResponseModelProperty({ type: 'number', example: 1 })
  wNumberOfHits: number;
  @ApiResponseModelProperty({ type: WeaponType, example: 'Tornado Rod' })
  wType: WeaponType;
  @ApiResponseModelProperty({ type: 'number', example: 8 })
  wDamage: number;
}
