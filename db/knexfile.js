require('dotenv').config({path: '../.env'});
const pg = require('pg');

pg.defaults.ssl = true;


module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL
}