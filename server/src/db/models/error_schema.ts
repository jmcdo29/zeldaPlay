// TODO: Add JSDoc documentation for file.
import { Model } from 'objection';

import { makeId } from '../../utils/utils';

export class DBError extends Model {
  static tableName = 'error';

  id: string;
  message: string;
  code: string;
  error_time: string;
  stack: string;

  $beforeInsert() {
    this.id = '00E' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    if (opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
