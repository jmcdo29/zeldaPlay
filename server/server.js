require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const flash = require('express-flash');
const path = require('path');
const cors = require('cors');
const errorHandlers = require('./utils/errorHandlers');

const PORT = process.env.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require('./utils/sessionConf'));
app.use(flash());

app.use(express.static(path.join(__dirname , '../dist/')));


app.use('/api', require('./controllers/character.controller'));
app.use('/users', require('./controllers/user.controller'));

app.use(errorHandlers.logErrors);
app.use(errorHandlers.badLogIn);
app.use(errorHandlers.databaseProblem);
app.use(errorHandlers.generalError);

app.get('/', (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
