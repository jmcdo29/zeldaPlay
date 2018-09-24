import { Model } from 'objection';

import { IAnswer } from '../../interfaces/answerInterface';
import { checkNull, makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} last_modified - time of last modification
 * @prop {string} question - question related to the answer
 * @prop {string} answer - the answer to the question, hashed in the db
 * @prop {string} user_id - the id of the user who answered
 * @prop {string} last_modified_by - id of the user who last modified, should always be same as user_id
 */
export class Recovery extends Model {
  static tableName = 'recovery_answer';

  id: string;
  last_modified: string;
  question: string;
  answer: string;
  user_id: string;

  /**
   * Creates an instance of Recovery.
   * @param {string} [id]
   * @param {IAnswer} [answer]
   * @memberof Recovery
   */
  constructor(id?: string, answer?: IAnswer) {
    super();
    if (id && answer) {
      this.id = checkNull(answer.id, 'string') as string;
      this.question = answer.question;
      this.answer = answer.answer;
      this.user_id = id;
    }
  }

  /**
   * makes the answer id
   * @memberof Recovery
   */
  $beforeInsert() {
    this.id = '00R' + makeId(9);
  }

  /**
   * sets last_modified time and checks the id hasn't changed
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Recovery
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
