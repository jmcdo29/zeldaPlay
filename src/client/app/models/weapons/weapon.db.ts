export interface IWeaponDb {
  wId?: string;
  wName: string;
  wDamage: number;
  wNumberOfHits: number;
  wCritRange: string;
  wCritDamage: number;
  wRange: number;
  wAmmo?: number;
  wType: string;
  wModifier: string;
  wElement?: any;
}
