import { Model, QueryBuilder } from 'objection';
import { ISkill } from '../../interfaces/skillInterface';
import { checkNull, makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} tableName - skill
 * @prop {string} last_modified - string of datetime of last modification
 * @prop {boolean} trained - if character is trained in the skill
 * @prop {string} name - skill name
 * @prop {number} ranks - number of ranks put into skill
 * @prop {string} modifier - modifier used when rolling skill check
 * @prop {string} [racial_modifier] - racial modifier to add, if any
 * @prop {string} [item_modifier] - item modifier to add, if any
 * @prop {string} [misc_modifier] - misc modifier to add, if any
 * @prop {string} skill_type - the type of skill. Either skill, weapon, or magic
 * @prop {string} character_id - owning Character of the skill
 * @prop {string} last_modified_by - user who last modified the skill
 */
export class Skill extends Model {
  static tableName = 'skill';

  id: string;
  last_modified: string;
  trained: boolean;
  name: string;
  ranks: number;
  modifier: string;
  racial_modifier?: string;
  item_modifier?: string;
  misc_modifier?: string;
  skill_type: string;
  character_id: string;
  last_modified_by: string;

  /**
   * updates or inserts the Skill, depending on the id
   * @static
   * @param {Skill} model
   * @returns {QueryBuilder<Skill, Skill, Skill>} QueryBuilder to execute
   * @memberof Skill
   */
  static upsert(model: Skill): QueryBuilder<Skill, Skill, Skill> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  /**
   * Creates an instance of Skill.
   * @param {string} [id] - id of the user who created it
   * @param {string} [chId] - id of the character the skill belongs to
   * @param {ISkill} [values] - the values for the skill
   * @param {string} [type] - the type of skill (Skill, Weapon, or Magic)
   * @memberof Skill
   */
  constructor(id?: string, chId?: string, values?: ISkill, type?: string) {
    super();
    if (id && chId && values && type) {
      this.id = checkNull(values.id) as string;
      this.character_id = chId;
      this.last_modified_by = id;
      this.ranks = values.ranks;
      this.skill_type = type;
      this.racial_modifier = checkNull(values.racial) as string;
      this.item_modifier = checkNull(values.item) as string;
      this.misc_modifier = checkNull(values.misc) as string;
      this.trained = values.trained;
      this.name = values.skillName;
      this.modifier = checkNull(values.modifier) as string;
    }
  }

  /**
   * create the Skill's id
   * @memberof Skill
   */
  $beforeInsert() {
    this.id = '00S' + makeId(9);
  }

  /**
   * double checks the id has not been changed and sets the last modified timestamp
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Skill
   */
  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
