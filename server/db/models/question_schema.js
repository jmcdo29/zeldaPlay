const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Question extends Model{

  static get tableName() {
    return 'public.recovery_question';
  }

  $beforeInsert() {
    this.id = '0rQ' + makeId(9);
  }
  
}

module.exports = Question;