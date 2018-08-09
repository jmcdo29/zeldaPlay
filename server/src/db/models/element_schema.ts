import { Model } from 'objection';

import { makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} last_modified - time of last modification
 * @prop {string} ast_modified_by - id of the user who made last modification
 * @prop {string} weapon_id - the id of the weapon the element belongs to
 * @prop {string} type - type of element, Fire, Lightning, Ice/Water, etc.
 * @prop {number} damage - the type of dice to roll
 * @prop {number} number_of_hits - how many times to roll that dice
 */
export class Element extends Model {
  static tableName = 'weapon_element';

  id: string;
  last_modified: string;
  last_modified_by: string;
  weapon_id: string;
  type: string;
  damage: number;
  number_of_hits: number;

  /**
   * Creates the id of the element
   * @memberof Element
   */
  $beforeInsert() {
    this.id = '0wE' + makeId(9);
  }

  /**
   * double checks that the id hasn't been changed and sets the last modified time ot now()
   * @param {*} opt
   * @param {*} queryContext
   * @memberof Element
   */
  $beforeUpdate(opt: any, queryContext: any) {
    this.last_modified = new Date(Date.now()).toISOString();
    if (opt.old && opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}
