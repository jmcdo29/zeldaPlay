// TODO: Add JSDoc documentation for file.
/**
 * A module to hold the character schema and Objection model for querying
 * @module db/models/Character
 * @export db/models/Character.Character
 */

import { QueryBuilder, Model, RelationMappings } from 'objection';

import { makeId, checkNull } from '../../utils/utils';

import { Weapon } from './weapon_schema';
import { Spell } from './spell_schema';
import { Skill } from './skill_schema';
import { Note } from './note_schema';
import { Save } from './save_schema';
import { CharacterInterface } from '../../interfaces/characterInterface';

/**
 * @extends {Model} extends the objection model to make querying easier
 * @private {string} tableName - "character" The name of the table for quering
 * @private {string} CHARID - internal variable to shorthand some code
 * @prop {string} id - id
 * @prop {string} name - name that the user has assigned
 * @prop {string} race - race. Slightly affects gameplay
 * @prop {string} [subrace] - subrace, if it exists
 * @prop {number} strength - strength score
 * @prop {number} dexterity - dexterity score
 * @prop {number} constitution - constitution score
 * @prop {number} intelligence - intelligence score
 * @prop {number} charisma - charisma score
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
 */
export class Character extends Model {
  static tableName = 'character';
  private static CHARID = '.character_id';

  static relationMappings: RelationMappings = {
    weapons: {
      relation: Model.HasManyRelation,
      modelClass: Weapon,
      join: {
        from: `${Character.tableName}.id`,
        to: `${Weapon.tableName + Character.CHARID}`
      }
    },

    spells: {
      relation: Model.HasManyRelation,
      modelClass: Spell,
      join: {
        from: `${Character.tableName}.id`,
        to: `${Spell.tableName + Character.CHARID}`
      }
    },

    skills: {
      relation: Model.HasManyRelation,
      modelClass: Skill,
      join: {
        from: `${Character.tableName}.id`,
        to: `${Skill.tableName + Character.CHARID}`
      }
    },

    saves: {
      relation: Model.HasManyRelation,
      modelClass: Save,
      join: {
        from: `${Character.tableName}.id`,
        to: `${Save.tableName + Character.CHARID}`
      }
    },

    notes: {
      relation: Model.HasManyRelation,
      modelClass: Note,
      join: {
        from: `${Character.tableName}.id`,
        to: `${Note.tableName + Character.CHARID}`
      }
    }
  };

  id: string;
  name: string;
  race: string;
  subrace?: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  ac?: number;
  flat_footed?: number;
  touch?: number;
  health: number;
  max_health: number;
  magic: number;
  max_magic: number;
  experience: number;
  size?: string;
  craft_one?: string;
  craft_two?: string;
  profession?: string;
  performance?: string;
  last_modified_by: string;
  user_id: string;
  level: number;
  last_modified: string;

  static upsert(
    model: Character
  ): QueryBuilder<Character, Character, Character> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id?: string, values?: CharacterInterface) {
    super();
    if (id && values) {
      this.name = values.name;
      this.strength = values.attributes[0].value;
      this.dexterity = values.attributes[1].value;
      this.constitution = values.attributes[2].value;
      this.intelligence = values.attributes[3].value;
      this.wisdom = values.attributes[4].value;
      this.charisma = values.attributes[5].value;
      this.max_health = values.maxHealth;
      this.health = values.health;
      this.max_magic = values.maxMagic;
      this.magic = values.magic;
      this.experience = values.exp;
      this.race = values.race;
      this.level = values.level;
      this.subrace = <string>checkNull(values.subrace);
      this.ac = <number>checkNull(values.ac);
      this.flat_footed = <number>checkNull(values.flat_footed);
      this.touch = <number>checkNull(values.touch);
      this.size = <string>checkNull(values.size);
      this.craft_one = <string>checkNull(values.craftOne);
      this.craft_two = <string>checkNull(values.craftTwo);
      this.performance = <string>checkNull(values.performCust);
      this.profession = <string>checkNull(values.profession);
      this.last_modified_by = id;
      this.user_id = id;
      this.id = checkNull(values.id).toString();
    }
  }

  $beforeInsert() {
    this.id = '00C' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }

  tableName() {
    return 'character';
  }
}
