// TODO: Add JSDoc documentation for file.
import { Model } from 'objection';

import { makeId } from '../../utils/utils';

/**
 * @extends {Model}
 * @prop {string} id
 * @prop {string} message - the error message
 * @prop {string} code - the error short code
 * @prop {string} error_time - time the error occurred
 * @prop {string} stack - first line of the error stack
 */
export class DBError extends Model {
  static tableName = 'error';

  id: string;
  message: string;
  code: string;
  error_time: string;
  stack: string;

  /**
   * Creates the error id
   * @memberof DBError
   */
  $beforeInsert() {
    this.id = '00E' + makeId(9);
  }
}
