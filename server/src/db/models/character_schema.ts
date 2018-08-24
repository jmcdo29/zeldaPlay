/**
 * A module to hold the character schema and Objection model for querying
 * @module db/models/Character
 * @export db/models/Character.Character
 */

import { Model, QueryBuilder, RelationMappings } from 'objection';

import { checkNull, makeId } from '../../utils/utils';

import { ICharacter } from '../../interfaces/characterInterface';
import { Note } from './note_schema';
import { Save } from './save_schema';
import { Skill } from './skill_schema';
import { Spell } from './spell_schema';
import { Weapon } from './weapon_schema';

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
 * @prop {Skill[]} skills - a character's skills
 * @prop {Weapon[]} weapons - the weapons a character has
 * @prop {Spell[]} spells - what spells a character can cast
 * @prop {Save[]} saves - reflex, will, and fortitude saves
 * @prop {Note[]} notes - a character's notes about the adventure
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
  skills?: Skill[];
  weapons?: Weapon[];
  spells?: Spell[];
  notes?: Note[];
  saves?: Save[];

  /**
   * Either updates or insert a model, depending on if the id already exists
   * @static
   * @param {Character} model
   * @returns {QueryBuilder<Character, Character, Character>} A QueryBuilder ready to be executed
   * @memberof Character
   */
  static upsert(
    model: Character
  ): QueryBuilder<Character, Character, Character> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insertAndFetch(model);
    }
  }

  /**
   * Creates an instance of Character.
   * @param {string} [id] - the id of the user who made the character
   * @param {ICharacter} [values] - the values of the character, passed from the client side
   * @memberof Character
   */
  constructor(id?: string, values?: ICharacter) {
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
      this.subrace = checkNull(values.subrace, 'string') as string;
      this.ac = checkNull(values.ac, 'number') as number;
      this.flat_footed = checkNull(values.flat_footed, 'number') as number;
      this.touch = checkNull(values.touch, 'number') as number;
      this.size = checkNull(values.size, 'string') as string;
      this.craft_one = checkNull(values.craftOne, 'string') as string;
      this.craft_two = checkNull(values.craftTwo, 'string') as string;
      this.performance = checkNull(values.performCust, 'string') as string;
      this.profession = checkNull(values.profession, 'string') as string;
      this.last_modified_by = id;
      this.user_id = id;
      this.id = checkNull(values.id, 'string').toString();
    }
  }

  /**
   * Create the Id before insert
   * @memberof Character
   */
  $beforeInsert() {
    this.id = '00C' + makeId(9);
  }

  /**
   * Check that the ide has not been changed and set the time of the latest update
   *
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Character
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }

  async $beforeDelete(context: any) {
    console.log('calling before delete');
    console.log(this);
    await Spell.query()
      .delete()
      .where({ character_id: this.id });
    await Skill.query()
      .delete()
      .where({ character_id: this.id });
    await Save.query()
      .delete()
      .where({ character_id: this.id });
    await Note.query()
      .delete()
      .where({ character_id: this.id });
    await Weapon.query()
      .delete()
      .where({ character_id: this.id });
  }

  /**
   * Gets the SQL tablename
   * @returns {string} character
   * @memberof Character
   */
  tableName(): string {
    return 'character';
  }
}
