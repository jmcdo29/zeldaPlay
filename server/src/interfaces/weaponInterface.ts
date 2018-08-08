/**
 * @prop {string} name - name of the weapon
 * @prop {string} id - the id of the weapon
 * @prop {number} attack - the DX the user should roll (X is 4, 6, 8, 10, etc.)
 * @prop {string[]} critRange - the range of rolls the user must roll for a critical hit [18,19,20] or [19,20], or [20]
 * @prop {number} [ammo] - how much ammo a uer has left for that weapon (only applicable to ranged weapons)
 * @prop {number} [range] - how far the ranged weapon can hit
 * @prop {string} modifier - the name of the modifier for the weapon (usually strength or dexterity)
 * @prop {string} type - the kind of weapon (short sword, ice rod, bow, etc.)
 * @prop {number} critDamage - how much to multiply a critical roll by
 * @prop {number} numberOfAttacks - how many times to roll the attack die.
 */
export interface WeaponInterface {
  name: string;
  id: string;
  attack: number;
  critRange: string[];
  ammo?: number;
  range?: number;
  modifier: string;
  type: string;
  critDamage: number;
  numberOfAttacks: number;
}
