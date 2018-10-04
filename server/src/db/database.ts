import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config({ path: '../../../.env' });

export const connection = createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: true,
  entities: [__dirname + '/entities/*.js'],
  schema: 'zeldaplay'
});
