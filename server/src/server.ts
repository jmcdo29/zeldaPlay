import { config } from 'dotenv';
config();
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as flash from 'express-flash';
import * as path from 'path';
import * as cors from 'cors';
import * as Knex from 'knex';
import { connectionConfig } from './db/knexfile';
import { Model } from 'objection';
import { logErrors, badLogIn, databaseProblem, generalError } from './utils/errorHandlers';
import { mySession } from './utils/sessionConf';
import { CharacterRouter } from './controllers/character.controller';
import { UserRouter } from './controllers/user.controller';


const knexConnection = Knex(connectionConfig);

Model.knex(knexConnection);
const PORT = process.env.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(mySession);
app.use(flash());

app.use(express.static(path.join(__dirname , '../../dist/')));


app.use('/api', CharacterRouter);
app.use('/users', UserRouter);

app.use(logErrors);
app.use(badLogIn);
app.use(databaseProblem);
app.use(generalError);

app.get('/', (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
