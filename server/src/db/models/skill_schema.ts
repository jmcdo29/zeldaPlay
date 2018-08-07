import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';

export class Skill extends Model {

  static tableName = 'skill';

  id: string;
  last_modified: string;
  trained: boolean;
  name: string;
  ranks: number;
  modifier: string;
  racial_modifier: string;
  item_modifier: string;
  misc_modifier: string;
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

  constructor(id, chId, values, type) {
    super();
    if (id && chId && values && type) {
      this.id = checkNull(values.id).toString();
      this.character_id = chId;
      this.last_modified_by = id;
      this.ranks = values.ranks;
      this.skill_type = type;
      this.racial_modifier = checkNull(values.racial).toString();
      this.item_modifier = checkNull(values.item).toString();
      this.misc_modifier = checkNull(values.misc).toString();
      this.trained = values.trained;
      this.name = values.skillName;
      this.modifier = checkNull(values.modifier).toString();
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
