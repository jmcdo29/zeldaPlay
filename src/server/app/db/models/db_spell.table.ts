import { Modifier } from './enums/modifiers.enum';

export class DbSpell {
  spId: string;
  spDamage: number;
  spDiety: 'Din' | 'Farore' | 'Nayru';
  spEffect: string;
  spModifier: Modifier;
  spMpUse: number;
  spName: string;
  spUseDiety: boolean;
  spNumberOfHits: number;
}
