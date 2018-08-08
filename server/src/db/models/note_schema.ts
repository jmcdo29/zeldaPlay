import { Model, QueryBuilder } from 'objection';
import { makeId, checkNull } from '../../utils/utils';
import { NoteInterface } from '../../interfaces/noteInterface';

/**
 * @extends {Model}
 * @prop {string} tableName - note
 * @prop {string} id
 * @prop {string} last_modified - time string of last modification
 * @prop {string} character_id - the id of the character the note belongs to
 * @prop {string} message - the body of the note
 * @prop {string} time - the time the note was taken (as a string)
 * @prop {boolean} important - if the note is marked important or not. Defaults as false
 * @prop {string} last_modified_by - the id of the user with the last modification
 */
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

  constructor(id: string, chId: string, values: NoteInterface) {
    super();
    if (id && chId && values) {
      this.id = <string>checkNull(values.id);
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
