import * as dotenv from 'dotenv';
import * as pg from 'pg';

dotenv.config({ path: '../../../.env' });

pg.defaults.ssl = true;

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL
};
