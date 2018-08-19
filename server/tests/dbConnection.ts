import { config } from 'dotenv';
config();
import * as pg from 'pg';

pg.defaults.ssl = true;

export const conn = {
  client: 'pg',
  connection: process.env.DATABASE_URL
};

// export const MyModel =  Model.knex(Knex(conn));
