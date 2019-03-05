import { Modifier, WeaponType } from './enums/index';

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
