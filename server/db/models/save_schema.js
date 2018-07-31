const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Save extends Model{

  static get tableName() {
    return 'public.saving_throw';
  }

  $beforeInsert() {
    this.id = '0St' + makeId(9);
  }

}

module.exports = Save;