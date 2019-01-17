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
    return this.dbService.query(``, [])[0];
  }

  async updateWeapon(weapon: DbWeapon): Promise<DbWeapon> {
    return this.dbService.query(``, [])[0];
  }
}
