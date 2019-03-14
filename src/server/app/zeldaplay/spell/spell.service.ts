import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbSpell } from '@DbModel/index';
import { DbSpellService } from './db-spell/db-spell.service';

@Injectable()
export class SpellService {
  constructor(private readonly dbService: DbSpellService) {}

  getSpells(charId: string): Observable<DbSpell[]> {
    return this.dbService.getSpells(charId);
  }

  newSpell(newSpell: DbSpell, charId: string): Observable<DbSpell> {
    return this.dbService.newSpell(newSpell, charId);
  }

  updateSpell(newSpell: DbSpell): Observable<DbSpell> {
    return this.dbService.updateSpell(newSpell);
  }
}
