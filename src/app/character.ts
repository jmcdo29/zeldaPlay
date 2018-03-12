import { Attribute } from './attribute';
import { Skill } from './skill';
export interface Character { 
  _id?: number;
  name: string;
  attributes: Attribute[];
  health: number;
  magic: number;
  exp: number;
  skills: Skill[];
  weaponSkills: Skill[];
  magicSkills: Skill[];
}

//Note to self, you can use ? to denote an optional property