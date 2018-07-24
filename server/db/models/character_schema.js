const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Character extends Model{
  static get tableName() {
    return 'public.character';
  }

  static get relationMappings() {
    const CHARID = '.character_id';
    const Weapon = require('./weapon_schema');
    const Spell = require('./spell_schema');
    const Skill = require('./skill_schema');
    const Note = require('./note_schema');
    const Save = require('./save_schema');

    return {
      weapons: {
        relation: Model.HasManyRelation,
        modelClass: Weapon,
        join: {
          from: `${this.tableName}.id`,
          to: `${Weapon.tableName + CHARID}`
        }
      },

      spells: {
        relation: Model.HasManyRelation,
        modelClass: Spell,
        join: {
          from: `${this.tableName}.id`,
          to: `${Spell.tableName + CHARID}`
        }
      },

      skills: {
        relation: Model.HasManyRelation,
        modelClass: Skill,
        join: {
          from: `${this.tableName}.id`,
          to: `${Skill.tableName + CHARID}`
        }
      },

      saves: {
        relation: Model.HasManyRelation,
        modelClass: Save,
        join: {
          from: `${this.tableName}.id`,
          to: `${Save.tableName + CHARID}`
        }
      },

      notes: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: `${this.tableName}.id`,
          to: `${Note.tableName + CHARID}`
        }
      }
    }
  }

  $beforeInsert() {
    this.id = '00C' + makeId(9);
  }
  
  $beforeUpdate(opt, queryContext) {
    this.last_modified = Model.knex(knexConnection).fn.now();
    if(opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

module.exports = Character;