const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');
const makeId = require('../../utils/makeId').makeId;

Model.knex(connection);

class DBError extends Model {

  static get tableName() {
    return 'public.error';
  }

  $beforeInsert() {
    this.id = '00E' + makeId(9);
  }

  $beforeUpdate(opt, queryContext) {
    if(opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

module.exports = DBError;
