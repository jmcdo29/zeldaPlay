import { ApiResponseModelProperty } from '@nestjs/swagger';

import { Race } from './enums/races.enum';

export class DbCharacterShort {
  @ApiResponseModelProperty({ type: 'string', example: '00Csntj8Gozz' })
  chId: string;
  @ApiResponseModelProperty({ type: 'string', example: 'Bryte' })
  chName: string;
  @ApiResponseModelProperty({ type: Race, example: 'Fairy' })
  chRace: Race;
}
