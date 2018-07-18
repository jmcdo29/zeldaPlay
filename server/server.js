require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');
const flash = require('express-flash');
const path = require('path');

const PORT = process.env.PORT;

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(require('./utils/sessionConf'));
app.use(flash());

app.use(express.static(path.join(__dirname , '../dist/')));

app.use('/v1', require('./v1').v1);

/* app.get(/^\W(?!(v1)\w*)\w*//*, (req, res, next) => {
  res.sendFile('./index.html');
}); */

app.use('/api', require('./routes/api'));

app.get('/', (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
