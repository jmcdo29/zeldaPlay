import { config } from 'dotenv';
config();
import * as cors from 'cors';
import * as express from 'express';
import * as flash from 'express-flash';
import * as helmet from 'helmet';
import { consoleLogger as scribe } from 'mc-scribe';
import * as morgan from 'morgan';
import * as path from 'path';

import { CharacterRouter } from './controllers/character.controller';
import { UserRouter } from './controllers/user.controller';
import { catchAll } from './utils/catchErrors';
import {
  badLogIn,
  databaseProblem,
  generalError,
  logErrors
} from './utils/errorHandlers';
import { sendApp } from './utils/sendApp';
import { mySession } from './utils/sessionConf';

import * as Knex from 'knex';
import { Model } from 'objection';
import * as connectionConfig from './db/knexfile';

Model.knex(Knex(connectionConfig));

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'https://zeldaplay/herokuapp.com'
  ],
  credentials: true
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(morganFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mySession);
app.use(flash());

app.use(express.static(path.join(__dirname, '../client/')));

CharacterRouter(app, '/api');
UserRouter(app, '/users');

app.get('/', sendApp);

app.get('*', catchAll);

app.use(logErrors);
app.use(badLogIn);
app.use(databaseProblem);
app.use(generalError);

export { app };
