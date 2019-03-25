import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbSpell } from '@DbModel/index';
import { map } from 'rxjs/operators';

@Injectable()
export class SpellService {
  constructor(private readonly dbService: DbService) {}

  getSpells(charId: string): Observable<DbSpell[]> {
    return this.dbService.query<DbSpell>(
      `SELECT
        id as "spId"
        ,name as "spName"
        ,diety as "spDiety"
        ,effect as "spEffect"
        ,mp_use as "spMpUse"
        ,use_diety as "spUseDiety"
        ,modifier as "spModifier"
        ,damage as "spDamage"
      FROM zeldaplay.spells
      WHERE character_id = $1`,
      [charId]
    );
  }

  newSpell(spell: DbSpell, charId: string): Observable<DbSpell> {
    return this.dbService
      .query<DbSpell>(
        `INSERT INTO zeldaplay.spells
      (name, effect, damage, diety, mp_use, use_diety, modifier, number_of_hits, character_id) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id as spId`,
        [
          spell.spName,
          spell.spEffect,
          spell.spDamage,
          spell.spDiety,
          spell.spMpUse,
          spell.spUseDiety,
          spell.spModifier,
          spell.spNumberOfHits,
          charId
        ]
      )
      .pipe(map((spells) => spells[0]));
  }

  updateSpell(spell: DbSpell): Observable<DbSpell> {
    return this.dbService
      .query<DbSpell>(
        `UPDATE zeldaplay.spells as spells
        SET damage = inSpell.damage
        ,diety = inSpell.diety
        ,effect = inSpell.effect
        ,modifier = inSpell.modifier
        ,mp_use = inSpell.mp_use
        ,name = inSpell.name
        ,use_diety = inSpell.use_diety
        ,number_of_hits = inSpell.number_of_hits
      FROM( VALUES($1, $2, $3, $4, $5, $6, $7, $8))
      AS inSpell(damage ,diety ,effect ,modifier ,mp_use ,name ,use_diety ,number_of_hits)
      WHERE spell.id = ${spell.spId}`,
        [
          spell.spDamage,
          spell.spDiety,
          spell.spEffect,
          spell.spModifier,
          spell.spMpUse,
          spell.spName,
          spell.spUseDiety,
          spell.spNumberOfHits
        ]
      )
      .pipe(map((spells) => spells[0]));
  }
}
