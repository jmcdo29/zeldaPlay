import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';

export class Note extends Model {
  static tableName = 'note';

  id: string;
  last_modified: string;
  character_id: string;
  message: string;
  time: string;
  important: boolean;
  last_modified_by: string;

  static upsert(model: Note): QueryBuilder<Note, Note, Note> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insert(model);
    }
  }

  constructor(id, chId, values) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id).toString();
      this.last_modified_by = id;
      this.character_id = chId;
      this.message = values.msg;
      this.important = false;
      this.time = values.time;
    }
  }

  $beforeInsert() {
    this.id = '00N' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
