require('dotenv').config();
const pg = require('pg');
const query = require('pg-query');
const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});
query.connectionString = process.env.DATABASE_URL;
pool.on('connect', () => console.log('connected'));
pool.on('acquire', () => console.log('acquired'));
pool.on('error', () => console.error('error'));

/* async function query() {
  const queryRes = await pool.query('SELECT * FROM zeldaplay.characters');
  console.log(queryRes);
}

query(); */

console.log(query('SELECT * FROM zeldaplay.characters'));
