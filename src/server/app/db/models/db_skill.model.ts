import { Modifier } from './enums/modifiers.enum';

export class DbSkill {
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
