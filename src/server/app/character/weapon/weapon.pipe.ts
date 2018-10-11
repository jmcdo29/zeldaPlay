import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Weapon } from '../../entities/weapon.entity';

import { WeaponDTO } from './interfaces/weapon.dto';

@Injectable()
export class WeaponPipe implements PipeTransform<WeaponDTO, Weapon> {
  transform(value: WeaponDTO, metadata: ArgumentMetadata) {
    const retVal = new Weapon();
    retVal.ammo = value.ammo;
    retVal.modifier = value.modifier;
    retVal.name = value.name;
    retVal.type = value.type;
    retVal.id = value.id;
    retVal.damage = value.attack;
    retVal.number_of_hits = value.numberOfAttacks;
    retVal.crit_range = parseRange(value.critRange);
    retVal.crit_multiplier = value.critDamage;
    return retVal;
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
