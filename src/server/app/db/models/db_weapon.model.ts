import { Modifier } from './enums/modifiers.enum';
import { WeaponType } from './enums/weapons.enum';

export class DbWeapon {
  wid: string;
  wname: string;
  wmodifier: Modifier;
  wammo: number;
  wrange: number;
  wcritdamage: number;
  wcritrange: string;
  wnumberofhits: number;
  wtype: WeaponType;
  wdamage: number;
}
