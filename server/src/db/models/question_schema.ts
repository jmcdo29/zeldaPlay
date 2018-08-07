import { Model } from 'objection';

import { makeId } from '../../utils/utils';

export class Question extends Model {
  static tableName = 'recovery_question';

  id: string;
  last_modified: string;
  question: string;

  $beforeInsert() {
    this.id = '0rQ' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
