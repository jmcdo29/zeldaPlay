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
  private weaponURL = environment.apiUrl + '/character/weapon/';

  constructor(private readonly http: HttpClient) {}

  // Get all of the weapons's for a character and map the db response to the client usage
  getWeapons(charId: string): Observable<Weapon[]> {
    return this.http.get<IWeaponDb[]>(this.weaponURL + charId).pipe(
      map((inWeapons) => {
        const retWeapons: Weapon[] = [];
        inWeapons.forEach((weapon) => {
          retWeapons.push(
            new Weapon(
              weapon.wId,
              weapon.wName,
              weapon.wDamage,
              weapon.wNumberOfHits,
              parseStringToIntArray(weapon.wCritRange),
              weapon.wCritMultiplier,
              weapon.wType,
              weapon.wModifier,
              weapon.wRange,
              weapon.wAmmo
            )
          );
        });
        return retWeapons;
      })
    );
  }

  // send a new weapon to the server and save the weapon's returned id to the original object
  newWeapon(charId: string, weapon: Weapon): Observable<Weapon> {
    return this.http
      .post<IWeaponDb>(
        this.weaponURL + '/new/' + charId,
        { weapon },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((retWeapon) => {
          weapon.id = retWeapon.wId;
          return weapon;
        })
      );
  }
  // send updated information about the weapon to the server. Because the weapon already exists with
  // up to date information, just return the weapon after the request is successful
  updateWeapon(weapon: Weapon): Observable<Weapon> {
    return this.http
      .post<IWeaponDb>(
        this.weaponURL + '/update/' + weapon.id,
        { weapon },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map(() => {
          return weapon;
        })
      );
  }
}
// transform the value of a string to a numeric array returning
// returning [18, 19, 20], [19, 20], or [20] depending on the initial string
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
