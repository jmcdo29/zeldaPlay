const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Skill extends Model{

  static get tableName() {
    return 'public.skill';
  }

  $beforeInsert() {
    this.id = '00S' + makeId(9);
  }

}

module.exports = Skill;