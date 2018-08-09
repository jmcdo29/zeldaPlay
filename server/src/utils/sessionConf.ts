import * as KnexSessionStore from 'connect-session-knex';
import * as session from 'express-session';
import * as Knex from 'knex';
import { connectionConfig } from '../db/knexfile';
const knex = Knex(connectionConfig);

const store = new KnexSessionStore(session)({
  knex,
  tablename: 'sessions'
});

export const mySession = session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  store,
  saveUninitialized: false,
  resave: true
});
