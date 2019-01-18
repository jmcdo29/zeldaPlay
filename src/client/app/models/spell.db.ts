export interface ISpellDb {
  spId?: string;
  spName: string;
  spEffect: string;
  spDamage: number;
  spNumberOfHits: number;
  spMpUse: number;
  spDiety: string;
  spUseDiety: boolean;
  spModifier?: string;
}
