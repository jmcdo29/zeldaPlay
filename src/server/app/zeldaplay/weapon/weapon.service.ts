import { Injectable } from '@nestjs/common';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { DbWeaponService } from './db-weapon/db-weapon.service';

@Injectable()
export class WeaponService {
  constructor(private readonly dbService: DbWeaponService) {}

  async getWeapons(charId: string): Promise<DbWeapon[]> {
    return this.dbService.getWeapons(charId);
  }

  async newWeapon(newWeap: DbWeapon, charId: string): Promise<DbWeapon> {
    return this.dbService.newWeapon(newWeap, charId);
  }

  async updateWeapon(newWeap: DbWeapon): Promise<DbWeapon> {
    return this.dbService.updateWeapon(newWeap);
  }
}
