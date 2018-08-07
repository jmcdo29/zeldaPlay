import { Model, RelationMappings } from 'objection' ;
import { makeId } from '../../utils/utils';


import { Character } from './character_schema';
import { Recovery as Answer } from './recovery_schema';
import { Spell } from './spell_schema';
import { Skill } from './skill_schema';
import { Save } from './save_schema';
import { Element } from './element_schema';
import { Note } from './note_schema';
import { Weapon } from './weapon_schema';

const LMB = '.last_modified_by';

export class User extends Model {

  static tableName = 'public.user';

  static relationMappings: RelationMappings =  {
    characters: {
      relation: Model.HasManyRelation,
      modelClass: Character,
      join: {
        from: `${User.tableName}.id`,
        to: `${Character.tableName}.user_id`
      }
    },

    answers: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: `${User.tableName}.id`,
        to: `${Answer.tableName}.user_id`
      }
    },

    lmbCharacter: {
      relation: Model.HasManyRelation,
      modelClass: Character,
      join: {
        from: `${User.tableName}.id`,
        to: `${Character.tableName + LMB}`
      }
    },

    lmbSpell: {
      relation: Model.HasManyRelation,
      modelClass: Spell,
      join: {
        from: `${User.tableName}.id`,
        to: `${Spell.tableName + LMB}`
      }
    },

    lmbWeapon: {
      relation: Model.HasManyRelation,
      modelClass: Weapon,
      join: {
        from: `${User.tableName}.id`,
        to: `${Weapon.tableName + LMB}`
      }
    },

    lmbElement: {
      relation: Model.HasManyRelation,
      modelClass: Element,
      join: {
        from: `${User.tableName}.id`,
        to: `${Element.tableName + LMB}`
      }
    },

    lmbAnswer: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: `${User.tableName}.id`,
        to: `${Answer.tableName + LMB}`
      }
    },

    lmbSave: {
      relation: Model.HasManyRelation,
      modelClass: Save,
      join: {
        from: `${User.tableName}.id`,
        to: `${Save.tableName + LMB}`
      }
    },

    lmbNote: {
      relation: Model.HasManyRelation,
      modelClass: Note,
      join: {
        from: `${User.tableName}.id`,
        to: `${Note.tableName + LMB}`
      }
    },

    lmbSkill: {
      relation: Model.HasManyRelation,
      modelClass: Skill,
      join: {
        from: `${User.tableName}.id`,
        to: `${Skill.tableName + LMB}`
      }
    }
  };

  id: string;
  last_modified: string;
  email: string;
  password: string;
  recovery_token: string;

  $beforeInsert() {
    this.id = '00U' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }

}
