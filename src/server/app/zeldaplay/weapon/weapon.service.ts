import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbWeapon } from '@DbModel/index';
import { DbWeaponService } from './db-weapon/db-weapon.service';

@Injectable()
export class WeaponService {
  constructor(private readonly dbService: DbWeaponService) {}

  getWeapons(charId: string): Observable<DbWeapon[]> {
    return this.dbService.getWeapons(charId);
  }

  newWeapon(newWeap: DbWeapon, charId: string): Observable<DbWeapon> {
    return this.dbService.newWeapon(newWeap, charId);
  }

  updateWeapon(newWeap: DbWeapon): Observable<DbWeapon> {
    return this.dbService.updateWeapon(newWeap);
  }
}
