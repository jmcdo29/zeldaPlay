import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { Modifier } from '@DbModel/enums/modifiers.enum';
import { WeaponType } from '@DbModel/enums/weapons.enum';
import { WeaponDTO } from '@Weapon/interfaces/weapon.dto';

@Injectable()
export class WeaponPipe implements PipeTransform<WeaponDTO, DbWeapon> {
  transform(value: WeaponDTO, metadata: ArgumentMetadata): DbWeapon {
    const retVal = new DbWeapon();
    retVal.wAmmo = value.ammo;
    retVal.wModifier = value.modifier as Modifier;
    retVal.wName = value.name;
    retVal.wType = value.type as WeaponType;
    retVal.wId = value.id;
    retVal.wDamage = value.attack;
    retVal.wNumberOfHits = value.numberOfAttacks;
    retVal.wCritRange = parseRange(value.critRange);
    retVal.wCritDamage = value.critDamage;
    return retVal;
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
