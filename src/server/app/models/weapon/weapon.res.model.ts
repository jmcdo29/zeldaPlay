import { ApiResponseModelProperty } from '@nestjs/swagger';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { Modifier } from '@DbModel/enums/modifiers.enum';
import { WeaponType } from '@DbModel/enums/weapons.enum';

export class WeaponRes {
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

  constructor(dbResponse: DbWeapon) {
    this.wAmmo = dbResponse.wammo;
    this.wCritDamage = dbResponse.wcritdamage;
    this.wCritRange = dbResponse.wcritrange;
    this.wDamage = dbResponse.wdamage;
    this.wId = dbResponse.wid;
    this.wModifier = dbResponse.wmodifier;
    this.wName = dbResponse.wname;
    this.wNumberOfHits = dbResponse.wnumberofhits;
    this.wRange = dbResponse.wrange;
    this.wType = dbResponse.wtype;
  }
}
