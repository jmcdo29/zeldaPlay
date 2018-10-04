export interface ISkill {
  id?: string;
  ranks: number;
  racial?: number;
  item?: number;
  misc?: number;
  trained: boolean;
  skillName: string;
  modifier?: string;
}
