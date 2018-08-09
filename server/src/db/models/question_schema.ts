import { Model } from 'objection';

import { makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} last_modified - time of last modification
 * @prop {string} question - the recovery question
 */
export class Question extends Model {
  static tableName = 'recovery_question';

  id: string;
  last_modified: string;
  question: string;

  /**
   * makes the id
   * @memberof Question
   */
  $beforeInsert() {
    this.id = '0rQ' + makeId(9);
  }

  /**
   * makes sure the id hasn't changed
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Question
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
