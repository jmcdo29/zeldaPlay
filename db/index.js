const Knex = require('knex');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig);

module.exports = knex;