import { Model } from 'objection';

import { makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} question - the recovery question
 */
export class Question extends Model {
  static tableName = 'recovery_question';

  id: string;
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
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
