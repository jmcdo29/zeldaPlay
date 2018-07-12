const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const makeId = require('../../utils/makeId').makeId;

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Weapon extends Model{
  static get tableName() {
    return 'public.weapon';
  }

  $beforeInsert() {
    this.id = '00W' + makeId(9);
  }
  
  $beforeUpdate(opt, queryContext) {
    this.last_modified = Model.knex(knexConnection).fn.now();
    if(opt.old.id !== this.id) {
      this.id = opt.old.id;
    }
  }
}

module.exports = Weapon;