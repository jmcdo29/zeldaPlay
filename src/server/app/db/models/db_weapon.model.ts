import { Modifier } from './enums/modifiers.enum';
import { WeaponType } from './enums/weapons.enum';

export class DbWeapon {
  wId: string;
  wName: string;
  wModifier: Modifier;
  wAmmo: number;
  wRange: number;
  wCritDamage: number;
  wCritRange: string;
  wNumberOfHits: number;
  wType: WeaponType;
  wDamage: number;
}
