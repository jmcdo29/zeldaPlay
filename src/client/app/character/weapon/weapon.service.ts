import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { Weapon } from '#Models/weapons/weapon';
import { IWeaponDb } from '#Models/weapons/weapon.db';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  constructor(private readonly http: HttpClient) {}

  getWeapons(charId: string): Observable<Weapon[]> {
    return this.http
      .get<IWeaponDb[]>(environment.apiUrl + '/character/weapon/' + charId)
      .pipe(
        map((inWeapons) => {
          const retWeapons: Weapon[] = [];
          inWeapons.forEach((weapon) => {
            retWeapons.push(
              new Weapon(
                weapon.id,
                weapon.name,
                weapon.damage,
                weapon.number_of_hits,
                parseStringToIntArray(weapon.crit_range),
                weapon.crit_multiplier,
                weapon.type,
                weapon.modifier,
                weapon.range,
                weapon.ammo
              )
            );
          });
          return retWeapons;
        })
      );
  }
}

function parseStringToIntArray(range: string): number[] {
  if (range.length === 2) {
    return [Number.parseInt(range)];
  } else {
    const start = Number.parseInt(range.substring(0, 2));
    const end = Number.parseInt(range.substring(range.length - 2));
    const retArray = [];
    for (let i = start; i <= end; i++) {
      retArray.push(i);
    }
    return retArray;
  }
}
