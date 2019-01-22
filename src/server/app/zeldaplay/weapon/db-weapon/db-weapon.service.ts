import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbWeapon } from '@Db/models/db_weapon.model';

@Injectable()
export class DbWeaponService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  async getWeapons(charId: string): Promise<DbWeapon[]> {
    return this.dbService.query<DbWeapon>(
      `SELECT
        id as wId
        ,name as wName
        ,modifier as wModifier
        ,ammo as wAmmo
        ,range as wRange
        ,crit_damage as wCritDamage
        ,crit_range as wCritRange
        ,number_of_hits as wNumberOfHits
        ,type as wType
        ,damage as wDamage
      FROM zeldaplay.weapons
      WHERE character_id = $1`,
      [charId]
    );
  }

  async newWeapon(weapon: DbWeapon, charId: string): Promise<DbWeapon> {
    return this.dbService.query(
      `INSERT INTO ${this.schema}.weapons
      (name, modifier, ammo, range, crit_damage, crit_range, number_of_hits, type, damage, character_id) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id as wId`,
      [
        weapon.wName,
        weapon.wModifier,
        weapon.wAmmo,
        weapon.wRange,
        weapon.wCritDamage,
        weapon.wCritRange,
        weapon.wNumberOfHits,
        weapon.wType,
        weapon.wDamage,
        charId
      ]
    )[0];
  }

  async updateWeapon(weapon: DbWeapon): Promise<DbWeapon> {
    return this.dbService.query(
      `UPDATE ${this.schema}.weapons as w
        SET name = inWeap.name
        ,modifier = inWeap.modifier
        ,ammo = inWeap.ammo
        ,range = inWeap.range
        ,crit_damage = inWeap.crit_damage
        ,crit_range = inWeap.crit_range
        ,number_of_hits = inWeap.number_of_hits
        ,type = inWeap.type
        ,damage = inWeap.damage
      FROM( VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9))
      AS inWeap(name, modifier, ammo, range, crit_damage, crit_range, number_of_hits, type, damage)
      WHERE w.id = ${weapon.wId}`,
      []
    )[0];
  }
}
