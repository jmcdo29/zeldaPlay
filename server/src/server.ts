import { config } from 'dotenv';
config();
import * as express from 'express';
import { consoleLogger as scribe } from 'mc-scribe';

import { useErrorHandlers, useMiddleware } from './middleware';
import { useRoutes } from './routes/index';
import { sendApp } from './utils/sendApp';

import * as Knex from 'knex';
import { Model } from 'objection';
import * as connectionConfig from './db/knexfile';

Model.knex(Knex(connectionConfig));

const app = express();

useMiddleware(app);
useRoutes(app);
app.get('/', sendApp);
useErrorHandlers(app);

export { app };
