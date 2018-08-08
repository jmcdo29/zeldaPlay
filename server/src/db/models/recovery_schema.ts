// TODO: Add JSDoc documentation for file.
import { Model } from 'objection';
import { makeId, checkNull } from '../../utils/utils';

export class Recovery extends Model {
  static tableName = 'recovery_answer';

  id: string;
  last_modified: string;
  question: string;
  answer: string;
  user_id: string;
  last_modified_by: string;

  constructor(id, answer) {
    super();
    if (id && answer) {
      this.id = checkNull(answer.id).toString();
      this.question = answer.question;
      this.answer = answer.answer;
      this.user_id = id;
      this.last_modified_by = id;
    }
  }

  $beforeInsert() {
    this.id = '00R' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
