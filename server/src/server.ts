import { config } from 'dotenv';
config();
import * as cors from 'cors';
import * as express from 'express';
import * as flash from 'express-flash';
import * as helmet from 'helmet';
import * as Knex from 'knex';
import * as morgan from 'morgan';
import { Model } from 'objection';
import * as path from 'path';
import { CharacterRouter } from './controllers/character.controller';
import { UserRouter } from './controllers/user.controller';
import { connectionConfig } from './db/knexfile';
import { catchAll } from './utils/catchErrors';
import {
  badLogIn,
  databaseProblem,
  generalError,
  logErrors
} from './utils/errorHandlers';
import { sendApp } from './utils/sendApp';
import { mySession } from './utils/sessionConf';

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

const knexConnection = Knex(connectionConfig);

Model.knex(knexConnection);

const app = express();

app.use(helmet());
app.use(cors());
// winston logger set up to log non errors with field level 'info'
app.use(
  morgan(morganFormat, {
    skip: (req: express.Request, res: express.Response) => {
      return res.statusCode >= 400;
    },
    stream: {
      write: (meta: any) => {
        console.log(meta);
      }
    }
  })
);
// winston logger set up to log errors with field level 'error'
app.use(
  morgan(morganFormat, {
    skip: (req: express.Request, res: express.Response) => {
      return res.statusCode < 400;
    },
    stream: {
      write: (meta: any) => {
        console.error(meta);
      }
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mySession);
app.use(flash());

app.use(express.static(path.join(__dirname, '../client/')));

app.use('/api', CharacterRouter);
app.use('/users', UserRouter);

app.use(logErrors);
app.use(badLogIn);
app.use(databaseProblem);
app.use(generalError);

app.get('/', sendApp);

app.get('*', catchAll);

export { app };
