import { Model, QueryBuilder } from 'objection';
import { INote } from '../../interfaces/noteInterface';
import { checkNull, makeId } from '../../utils/utils';

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

  /**
   * updates or inserts the model, depending on model.id
   * @static
   * @param {Note} model
   * @returns {QueryBuilder<Note, Note, Note>} QueryBuilder to be executed on
   * @memberof Note
   */
  static upsert(model: Note): QueryBuilder<Note, Note, Note> {
    if (model.id && model.id !== null) {
      return model.$query().patchAndFetch(model);
    } else {
      return model.$query().insertAndFetch(model);
    }
  }

  /**
   * Creates an instance of Note.
   * @param {string} [id] - id of the user who made the note
   * @param {string} [chId] - id of the character the note belongs to
   * @param {INote} [values] - values from the client side
   * @memberof Note
   */
  constructor(id?: string, chId?: string, values?: INote) {
    super();
    if (id && chId && values) {
      this.id = checkNull(values.id, 'string') as string;
      this.last_modified_by = id;
      this.character_id = chId;
      this.message = values.msg;
      this.important = false;
      this.time = values.time;
    }
  }

  /**
   * Creates the id of the note
   * @memberof Note
   */
  $beforeInsert() {
    this.id = '00N' + makeId(9);
  }

  /**
   * sets the last modified time and makes sure the id hasn't changed
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Note
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
