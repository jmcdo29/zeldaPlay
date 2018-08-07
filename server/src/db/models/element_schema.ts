import { Model } from 'objection';

import { makeId } from '../../utils/utils';

export class Element extends Model {
  static tableName = 'weapon_element';

  id: string;
  last_modified: string;
  last_modified_by: string;
  weapon_id: string;
  type: string;
  damage: number;
  number_of_hits: number;

  $beforeInsert() {
    this.id = '0wE' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
