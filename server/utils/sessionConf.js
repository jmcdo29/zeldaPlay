const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConf = require('../db/knexfile');
const Knex = require('knex');
const knex = Knex(dbConf);

const store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions'
});

const mySession = session({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 60000},
  store: store,
  saveUninitialized: false,
  resave: true
});

module.exports = mySession;