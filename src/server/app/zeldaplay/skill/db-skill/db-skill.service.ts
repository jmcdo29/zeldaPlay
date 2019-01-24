import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbSkill } from '@DbModel/db_skill.model';

@Injectable()
export class DbSkillService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  async getSkills(charId: string): Promise<DbSkill[]> {
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
