import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbWeapon } from '@Db/models/db_weapon.model';

@Injectable()
export class DbWeaponService {
  private schema: string;

  constructor (
    private readonly dbService: DbService
  ) {
    this.schema = 'zeldaplay';
  }

  async getWeapons(charId: string): Promise<DbWeapon[]> {
    return this.dbService.query<DbWeapon>(``, []);
  }

  async newWeapon(weapon: DbWeapon, charId: string): Promise<DbWeapon> {
    return this.dbService.query(``, [])[0];
  }

  async updateWeapon(weapon: DbWeapon): Promise<DbWeapon> {
    return this.dbService.query(``, [])[0];
  }
}
