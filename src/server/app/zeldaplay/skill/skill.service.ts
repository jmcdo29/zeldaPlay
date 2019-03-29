import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbSkill } from '@DbModel/index';

@Injectable()
export class SkillService {
  constructor(private readonly dbService: DbService) {}

  getCharacterSkills(charId: string): Observable<DbSkill[]> {
    return this.dbService.query<DbSkill>(
      `SELECT
        id as "skId"
        ,ranks as "skRanks"
        ,trained as "skTrained"
        ,item_modifier as "skItemModifier"
        ,misc_modifier as "skMiscModifier"
        ,modifier as "skModifier"
        ,name as "skName"
        ,type as "skType"
        ,racial_modifier as "skRacialModifier"
      FROM zeldaplay.skills
      WHERE character_id = $1
      `,
      [charId]
    );
  }
}
