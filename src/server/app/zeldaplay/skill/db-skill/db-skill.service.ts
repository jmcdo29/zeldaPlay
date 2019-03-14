import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbSkill } from '@DbModel/index';
import { Observable } from 'rxjs';

@Injectable()
export class DbSkillService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  getSkills(charId: string): Observable<DbSkill[]> {
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
      FROM ${this.schema}.skills
      WHERE character_id = $1
      `,
      [charId]
    );
  }
}
