import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';
import { SkillInterface } from '../../interfaces/skillInterface';

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

  static upsert(model: Skill): QueryBuilder<Skill, Skill, Skill> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id: string, chId: string, values: SkillInterface, type: string) {
    super();
    if (id && chId && values && type) {
      this.id = <string>checkNull(values.id);
      this.character_id = chId;
      this.last_modified_by = id;
      this.ranks = values.ranks;
      this.skill_type = type;
      this.racial_modifier = <string>checkNull(values.racial);
      this.item_modifier = <string>checkNull(values.item);
      this.misc_modifier = <string>checkNull(values.misc);
      this.trained = values.trained;
      this.name = values.skillName;
      this.modifier = <string>checkNull(values.modifier);
    }
  }

  $beforeInsert() {
    this.id = '00S' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
