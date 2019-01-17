import { Injectable } from '@nestjs/common';

import { DbSpell } from '@Db/models/db_spell.table';
import { DbSpellService } from './db-spell/db-spell.service';

@Injectable()
export class SpellService {
  constructor(
    private readonly dbService: DbSpellService
  ) {}

  async getSpells(charId: string): Promise<DbSpell[]> {
    return this.dbService.getSpells(charId);
  }

  async newSpell(newSpell: DbSpell, charId: string): Promise<DbSpell> {
    return this.dbService.newSpell(newSpell, charId);
  }

  async updateSpell(newSpell: DbSpell): Promise<DbSpell> {
    return this.dbService.updateSpell(newSpell);
  }
}
