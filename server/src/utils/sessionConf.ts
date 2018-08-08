import * as  session from 'express-session';
const KnexSessionStore = require('connect-session-knex')(session);
import {connectionConfig} from '../db/knexfile';
import * as Knex from 'knex';
const knex = Knex(connectionConfig);

const store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions'
});

export const mySession = session({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 60000},
  store: store,
  saveUninitialized: false,
  resave: true
});
