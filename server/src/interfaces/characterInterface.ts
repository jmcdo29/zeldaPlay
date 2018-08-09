import { INote } from './noteInterface';
import { ISave } from './saveInterface';
import { ISkill } from './skillInterface';
import { ISpell } from './spellInterface';
import { IWeapon } from './weaponInterface';

/**
 * @prop {number} value - the score the of the Attribute
 * @prop {number} modifier - the mod of the score
 * @prop {string} name - the name of the attribute. Used on client side
 */
interface IAttribute {
  value: number;
  name: string;
  modifier: number;
}

/**
 * @prop {string} id - id
 * @prop {string} name - name that the user has assigned
 * @prop {string} race - race. Slightly affects gameplay
 * @prop {string} [subrace] - subrace, if it exists
 * @prop {number} [ac] - ac score, if saved
 * @prop {number} [flat_footed] - flat_footed score, if saved
 * @prop {number} [touch] - touch score, if saved
 * @prop {number} health - current health
 * @prop {number} max_health - max possibly health
 * @prop {number} magic - curret mp
 * @prop {number} max_magic - max possible mp
 * @prop {number} experience - current experience
 * @prop {string} [size] - tiny, small, medium, or large
 * @prop {string} [craft_one] - first of two craft abilities that are customizable, not all have it though
 * @prop {string} [craft_two] - like craft_one, but number two
 * @prop {string} [profession] - the line of work the character was in before adventuring
 * @prop {string} [performance] - what special performances the character can do
 * @prop {string} last_modified_by - id of the last user to modify the character
 * @prop {string} user_id - the id of the character owner
 * @prop {number} level - the current level
 * @prop {string} last_modified - date string of the last modification
 * @prop {IAttribute[]} attributes - holds the strength, dexterity, constitution ...
 * @prop {IWeapon[]} [weapons] - the weapons the character has
 * @prop {ISkill[]} [skills] - the skills of the character
 * @prop {ISkill[]} [weaponSkills] - the weapon skills of the character
 * @prop {ISkill[]} [magicSkills] - the magic skills of the character
 * @prop {INote[]} [notes] - the notes the character has taken
 * @prop {ISpell[]} [spells] - the spells the character knows
 * @prop {ISave[]} [savingThrows] - the saving throws of the character
 */

export interface ICharacter {
  id: string;
  name: string;
  race: string;
  subrace?: string;
  ac?: number;
  flat_footed?: number;
  touch?: number;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  exp: number;
  size?: string;
  craftOne?: string;
  craftTwo?: string;
  profession?: string;
  performCust?: string;
  last_modified_by: string;
  user_id: string;
  level: number;
  last_modified: string;
  attributes: IAttribute[];
  weapons: IWeapon[];
  skills: ISkill[];
  weaponSkills: ISkill[];
  magicSkills: ISkill[];
  spells: ISpell[];
  notes: INote[];
  savingThrows: ISave[];
}
