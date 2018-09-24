import * as RedisStore from 'connect-redis';
import * as session from 'express-session';

const store = RedisStore(session);

export const mySession = session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  store: new store({ url: process.env.REDIS_URL }),
  saveUninitialized: true,
  resave: false
});
