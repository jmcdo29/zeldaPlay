/**
 * @prop {string} [id]
 * @prop {string} name - what the spell is called
 * @prop {string} effect - what the spell does.
 * @prop {number} mpUse - how much mp the spell costs
 * @prop {string} [modifier] - modifier to use when calculating damage, if any
 * @prop {string} diety - which diety the spell falls under, Nayru, Farore, or Din
 * @prop {boolean} useDiety - if diety should be used instead of modifier
 * @prop {number} damage - the kind of dice to roll for casting the spell
 * @prop {number} multiplier - how many dice the spell should roll
 */
export interface ISpell {
  id?: string;
  name: string;
  effect: string;
  mpUse: number;
  modifier?: string;
  diety: string;
  useDiety: boolean;
  damage: number;
  multiplier: number;
}
