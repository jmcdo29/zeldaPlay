import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Race } from './enums/index';
import { DbSave, DbSkill } from './index';

export class DbCharacter {
  @ApiResponseModelProperty({ type: 'string', example: '00Csntj8Gozz' })
  chId: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Bryte' })
  chName: string;
  @ApiResponseModelProperty({ type: Race, example: 'Fairy' })
  chRace: Race;
  @ApiResponseModelProperty({ type: 'string', example: 'Nayru' })
  chSubrace?: string;
  @ApiResponseModelProperty({ type: 'number', example: 12 })
  chStrength?: number;
  @ApiResponseModelProperty({ type: 'number', example: 11 })
  chDexterity?: number;
  @ApiResponseModelProperty({ type: 'number', example: 14 })
  chConstitution?: number;
  @ApiResponseModelProperty({ type: 'number', example: 12 })
  chIntelligence?: number;
  @ApiResponseModelProperty({ type: 'number', example: 25 })
  chWisdom?: number;
  @ApiResponseModelProperty({ type: 'number', example: 18 })
  chCharisma?: number;
  @ApiResponseModelProperty({ type: 'number', example: 6 })
  chLevel?: number;
  @ApiResponseModelProperty({ type: 'number', example: 35100 })
  chExperience?: number;
  @ApiResponseModelProperty({ type: 'number', example: 166 })
  chHealth?: number;
  @ApiResponseModelProperty({ type: 'number', example: 166 })
  chHealthMax?: number;
  @ApiResponseModelProperty({ type: 'number', example: 77 })
  chMagic?: number;
  @ApiResponseModelProperty({ type: 'number', example: 77 })
  chMagicMax?: number;
  @ApiResponseModelProperty({ type: 'string', example: 'Dancing' })
  chPerformance?: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Armor Smith' })
  chProfession?: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Fairy Made Armor' })
  chCraftOne?: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Magic Potions' })
  chCraftTwo?: string;
  @ApiResponseModelProperty({ type: [DbSkill] })
  skills?: DbSkill[];
  @ApiResponseModelProperty({ type: [DbSave] })
  saves?: DbSave[];
}
