import { Injectable } from '@nestjs/common';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { WeaponRes } from '@Model/weapon/weapon.res.model';
import { DbWeaponService } from './db-weapon/db-weapon.service';

@Injectable()
export class WeaponService {
  constructor(private readonly dbService: DbWeaponService) {}

  async getWeapons(charId: string): Promise<WeaponRes[]> {
    const weapons = await this.dbService.getWeapons(charId);
    const returnWeapons: WeaponRes[] = [];
    for (const wep of weapons) {
      returnWeapons.push(new WeaponRes(wep));
    }
    return returnWeapons;
  }

  async newWeapon(newWeap: DbWeapon, charId: string): Promise<WeaponRes> {
    const weapon = await this.dbService.newWeapon(newWeap, charId);
    return new WeaponRes(weapon);
  }

  async updateWeapon(newWeap: DbWeapon): Promise<WeaponRes> {
    const weapon = await this.dbService.updateWeapon(newWeap);
    return new WeaponRes(weapon);
  }
}
