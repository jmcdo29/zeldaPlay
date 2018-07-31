const Knex = require('knex');
const connection = require('../knexfile');
const Model = require('./CustomModel');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Element extends Model{

  static get tableName() {
    return 'public.weapon_element';
  }

  $beforeInsert() {
    this.id = '0wE' + makeId(9);
  }
  
}

module.exports = Element;