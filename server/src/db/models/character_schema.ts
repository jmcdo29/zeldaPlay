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

export class Character extends Model {
  static tableName = 'character';
  static CHARID = '.character_id';

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
  ac?: number | string;
  flat_footed?: number | string;
  touch?: number | string;
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

  constructor(id?, values?) {
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
      this.subrace = checkNull(values.subrace).toString();
      this.ac = checkNull(values.ac);
      this.flat_footed = checkNull(values.flat_footed);
      this.touch = checkNull(values.touch);
      this.size = checkNull(values.size).toString();
      this.craft_one = checkNull(values.craftOne).toString();
      this.craft_two = checkNull(values.craftTwo).toString();
      this.performance = checkNull(values.performCust).toString();
      this.profession = checkNull(values.profession).toString();
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
