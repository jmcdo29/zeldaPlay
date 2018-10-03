import { config } from 'dotenv';
config();
import * as express from 'express';

import { useErrorHandlers, useMiddleware } from './middleware';
import { useRoutes } from './routes/index';

import * as Knex from 'knex';
import { Model } from 'objection';
import * as connectionConfig from './db/knexfile';

Model.knex(Knex(connectionConfig));

const app = express();

useMiddleware(app);
useRoutes(app);
useErrorHandlers(app);

export { app };
