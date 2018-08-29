import { Elemental } from './elemental';

export class Weapon {
  name: string;
  attack: number; // Number of sides the damage dice has
  numberOfAttacks: number; // For the in case you have multiple attack dice
  critRange: number[]; // Values for which rolling a crit leads to crit damage
  critDamage: number; // Crit damage multiplier
  type: string;
  modifier: string;
  range: number;
  element?: Elemental;
  ammo?: number;
  id?: string;
}
