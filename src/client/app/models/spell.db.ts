export interface ISpellDb {
  id?: string;
  name: string;
  effect: string;
  damage: number;
  number_of_hit: number;
  mp_use: number;
  diety: string;
  use_diety: boolean;
  modifier?: string;
}
