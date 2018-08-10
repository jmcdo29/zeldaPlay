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
import {
  badLogIn,
  databaseProblem,
  generalError,
  logErrors
} from './utils/errorHandlers';
import { logger } from './utils/logger';
import { mySession } from './utils/sessionConf';

class MyStream {
  write(text: string, statusCode: number) {
    if (statusCode < 400) {
      logger.info(text);
    } else {
      logger.error(text);
    }
  }
}

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

const knexConnection = Knex(connectionConfig);

Model.knex(knexConnection);

const app = express();

app.use(helmet());
app.use(cors());
app.use(
  morgan(morganFormat, {
    skip: (req: express.Request, res: express.Response) => {
      return res.statusCode >= 400;
    },
    stream: {
      write: (meta: any) => {
        logger.info(meta);
      }
    }
  })
);
app.use(
  morgan(morganFormat, {
    skip: (req: express.Request, res: express.Response) => {
      return res.statusCode < 400;
    },
    stream: {
      write: (meta: any) => {
        logger.error(meta);
      }
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mySession);
app.use(flash());

app.use(express.static(path.join(__dirname, '../../dist/')));

app.use('/api', CharacterRouter);
app.use('/users', UserRouter);

app.use(logErrors);
app.use(badLogIn);
app.use(databaseProblem);
app.use(generalError);

app.get('/', (req, res, next) => {
  res.sendFile('./index.html');
});

export { app };
