import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';

const store = RedisStore(session);

const sessionOpts = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000, httpOnly: false },
  store: new store({ url: process.env.REDIS_URL }),
  saveUninitialized: false,
  name: 'zelda',
  resave: false
};

export const MySessionMiddleware = () =>
  ExpressSessionMiddleware.configure(sessionOpts);
