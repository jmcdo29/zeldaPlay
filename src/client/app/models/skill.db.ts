export interface ISkillDb {
  name: string;
  ranks: number;
  trained: boolean;
  modifier?: string;
  item_modifier?: number;
  racial_modifier?: number;
  misc_modifier?: number;
  id?: string;
  skill_type: string;
}
