// TODO: Add JSDoc documentation for file.
import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';

export class Save extends Model {
  static tableName = 'saving_throw';

  id: string;
  last_modified: string;
  character_id: string;
  racial_bonus: number | string;
  name: string;
  modifier: string;
  last_modified_by: string;

  static upsert(model: Save): QueryBuilder<Save, Save, Save> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id, chId, values) {
    super();
    if (id && chId && values) {
      this.id = <string>checkNull(values.id);
      this.character_id = chId;
      this.last_modified_by = id;
      this.name = values.name;
      this.racial_bonus = values.racial;
      this.modifier = values.modifier;
    }
  }

  $beforeInsert() {
    this.id = '0St' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
