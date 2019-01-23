import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { Modifier } from '@DbModel/enums/modifiers.enum';
import { WeaponType } from '@DbModel/enums/weapons.enum';
import { WeaponDTO } from '@Weapon/interfaces/weapon.dto';

@Injectable()
export class WeaponPipe implements PipeTransform<WeaponDTO, DbWeapon> {
  transform(value: WeaponDTO, metadata: ArgumentMetadata): DbWeapon {
    const retVal = new DbWeapon();
    retVal.wammo = value.ammo;
    retVal.wmodifier = value.modifier as Modifier;
    retVal.wname = value.name;
    retVal.wtype = value.type as WeaponType;
    retVal.wid = value.id;
    retVal.wdamage = value.attack;
    retVal.wnumberofhits = value.numberOfAttacks;
    retVal.wcritrange = parseRange(value.critRange);
    retVal.wcritdamage = value.critDamage;
    return retVal;
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
