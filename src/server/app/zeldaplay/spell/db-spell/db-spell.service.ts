import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbSpell } from '@Db/models/db_spell.table';

@Injectable()
export class DbSpellService {
  private schema: string;

  constructor (
    private readonly dbService: DbService
  ) {
    this.schema = 'zeldaplay';
  }

  async getSpells(charId: string): Promise<DbSpell[]> {
    return this.dbService.query<DbSpell>(
      `SELECT
        id as spId
        ,name as spName
        ,diety as spDiety
        ,effect as spEffect
        ,mp_use as spMpUse
        ,use_diety as spUseDiety
        ,modifier as spModifier
        ,damage as spDamage
      FROM zeldaplay.spells
      WHERE character_id = $1`,
      [charId]
    );
  }

  async newSpell(spell: DbSpell, charId: string): Promise<DbSpell> {
    return this.dbService.query<DbSpell>(``, [])[0];
  }

  async updateSpell(spell: DbSpell): Promise<DbSpell> {
    return this.dbService.query<DbSpell>(``, [])[0];
  }
}
