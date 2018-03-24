import { Weapon } from './weapon';

export interface RangedWeapon extends Weapon {
  range: number;
  ammo?: number;
}
