const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class User extends Model{

  static get tableName() {
    return 'public.user';
  }

  static get relationMappings() {
    const LMB = '.last_modified_by';
    const Character = require('./character_schema');
    const Answer = require('./recovery_schema');
    const Spell = require('./spell_schema');
    const Skill = require('./skill_schema');
    const Save = require('./save_schema');
    const Element = require('./element_schema');
    const Note = require('./note_schema');
    const Weapon = require('./weapon_schema');

    return {
      characters: {
        relation: Model.HasManyRelation,
        modelClass: Character,
        join: {
          from: `${this.tableName}.id`,
          to: `${Character.tableName}.user_id`
        }
      },

      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: `${this.tableName}.id`,
          to: `${Answer.tableName}.user_id`
        }
      },

      lmbCharacter: {
        relation: Model.HasManyRelation,
        modelClass: Character,
        join: {
          from: `${this.tableName}.id`,
          to: `${Character.tableName + LMB}`
        }
      },

      lmbSpell: {
        relation: Model.HasManyRelation,
        modelClass: Spell,
        join: {
          from: `${this.tableName}.id`,
          to: `${Spell.tableName + LMB}`
        }
      },

      lmbWeapon: {
        relation: Model.HasManyRelation,
        modelClass: Weapon,
        join: {
          from: `${this.tableName}.id`,
          to: `${Weapon.tableName + LMB}`
        }
      },

      lmbElement: {
        relation: Model.HasManyRelation,
        modelClass: Element,
        join: {
          from: `${this.tableName}.id`,
          to: `${Element.tableName + LMB}`
        }
      },

      lmbAnswer: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: `${this.tableName}.id`,
          to: `${Answer.tableName + LMB}`
        }
      },

      lmbSave: { 
        relation: Model.HasManyRelation,
        modelClass: Save,
        join: {
          from: `${this.tableName}.id`,
          to: `${Save.tableName + LMB}`
        }
      },

      lmbNote: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: `${this.tableName}.id`,
          to: `${Note.tableName + LMB}`
        }
      },

      lmbSkill: {
        relation: Model.HasManyRelation,
        modelClass: Skill,
        join: {
          from: `${this.tableName}.id`,
          to: `${Skill.tableName + LMB}`
        }
      }
    }
  }

  $beforeInsert() {
    this.id = '00U' + makeId(9);
  }
  
  $beforeUpdate(opt, queryContext) {
    this.last_modified = Model.knex(knexConnection).fn.now();
    if(opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

module.exports =  User;