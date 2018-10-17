export interface IWeaponDb {
  id?: string;
  name: string;
  damage: number;
  number_of_hits: number;
  crit_range: string;
  crit_multiplier: number;
  range: number;
  ammo?: number;
  type: string;
  modifier: string;
  element?: any;
}
