import { Modifier } from './enums/modifiers.enum';

export class DbSave {
  skId: string;
  skItemModifier: number;
  skMiscModifier: number;
  skModifier: Modifier;
  skName: string;
  skRacialModifier: number;
  skRanks: number;
  skTrained: boolean;
  skType: 'magic' | 'skill' | 'weapon';
}
