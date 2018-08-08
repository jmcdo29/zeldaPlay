import { WeaponInterface } from './weaponInterface';
import { SkillInterface } from './skillInterface';
import { SpellInterface } from './spellInterface';
import { NoteInterface } from './noteInterface';
import { SaveInterface } from './saveInterface';

/**
 * @prop {number} value - the score the of the Attribute
 * @prop {number} modifier - the mod of the score
 * @prop {string} name - the name of the attribute. Used on client side
 */
interface AttributesInterface {
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
 * @prop {AttributesInterface[]} attributes - holds the strength, dexterity, constitution ...
 * @prop {WeaponInterface[]} [weapons] - the weapons the character has
 */

export interface CharacterInterface {
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
  attributes: AttributesInterface[];
  weapons: WeaponInterface[];
  skills: SkillInterface[];
  weaponSkills: SkillInterface[];
  magicSkills: SkillInterface[];
  spells: SpellInterface[];
  notes: NoteInterface[];
  savingThrows: SaveInterface[];
 }
