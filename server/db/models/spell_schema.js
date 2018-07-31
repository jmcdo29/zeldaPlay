const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Spell extends Model{

  static get tableName() {
    return 'public.spell';
  }

  $beforeInsert() {
    this.id = '0Sp' + makeId(9);
  }

}

module.exports = Spell;