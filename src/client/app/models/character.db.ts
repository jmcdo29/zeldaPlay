import { INoteDb } from '#Models/note.db';
import { ISkillDb } from '#Models/skill.db';
import { ISpellDb } from '#Models/spell.db';
import { IWeaponDb } from '#Models/weapons/weapon.db';

export interface ICharacterQuery {
  ac: number;
  charisma: number;
  constitution: number;
  craft_one: string;
  craft_two: string;
  dexterity: number;
  experience: number;
  flat_footed: number;
  health: number;
  id: string;
  intelligence: number;
  level: number;
  magic: number;
  max_health: number;
  max_magic: number;
  name: string;
  performance: string;
  profession: string;
  race: string;
  size: string;
  strength: number;
  subrace: string;
  touch: number;
  wisdom: number;
  // notes: INoteDb[];
  saves: Array<{
    id?: string;
    name: string;
    modifier: string;
    racial_bonus: number;
  }>;
  skills: ISkillDb[];
  // spells: ISpellDb[];
  // weapons: IWeaponDb[];
}
