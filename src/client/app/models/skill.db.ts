export interface ISkillDb {
  skName: string;
  skRanks: number;
  skTrained: boolean;
  skModifier?: string;
  skItemModifier?: number;
  skRacialModifier?: number;
  skMiscModifier?: number;
  skId?: string;
  skType: string;
}
