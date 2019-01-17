import { Race } from './enums/races.enum';

import { DbNote } from './db_note.model';
import { DbSave } from './db_save.model';
import { DbSkill } from './db_skill.model';
import { DbSpell } from './db_spell.table';
import { DbWeapon } from './db_weapon.model';

export class DbCharacter {
  chId: string;
  chName: string;
  chRace: Race;
  chSubrace?: string;
  chStrength?: number;
  chDexterity?: number;
  chConstitution?: number;
  chIntelligence?: number;
  chWisdom?: number;
  chCharisma?: number;
  chLevel?: number;
  chExperience?: number;
  chHealth?: number;
  chHealthMax?: number;
  chMagic?: number;
  chMagicMax?: number;
  chPerformance?: string;
  chProfession?: string;
  chCraftOne?: string;
  chCraftTwo?: string;
  skills?: DbSkill[];
  saves?: DbSave[];
  spells?: DbSpell[];
  weapons?: DbWeapon[];
  notes?: DbNote[];
}
