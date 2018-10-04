import 'reflect-metadata';

import { config } from 'dotenv';
config();

import * as express from 'express';

import { connection } from './db/database';
import { useErrorHandlers, useMiddleware } from './middleware';
import { useRoutes } from './routes/index';

connection.then(() => console.log('table synced')).catch((err) => {
  console.error(err.message);
  process.exit(1);
});

const app = express();

useMiddleware(app);
useRoutes(app);
useErrorHandlers(app);

export { app };
