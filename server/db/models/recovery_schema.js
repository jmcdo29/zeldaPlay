const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Recovery extends Model{

  static get tableName() {
    return 'public.recovery_answer';
  }

  $beforeInsert() {
    this.id = '00R' + makeId(9);
  }

}

module.exports = Recovery;