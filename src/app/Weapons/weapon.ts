import { Elemental } from './elemental';

export interface Weapon {
  name: string;
  attack: number;               // Number of sides the damage dice has
  numberOfAttacks: number;      // For the in case you have multiple attack dice
  critRange: number[];          // Values for which rolling a crit leads to crit damage
  cirtDamage: number;           // Crit damage multiplier
  description: string;
  modifier: string;
  element?: Elemental;
}
