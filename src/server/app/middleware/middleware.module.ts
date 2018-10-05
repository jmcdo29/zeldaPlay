import { CorsMiddleware } from '@nest-middlewares/cors';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';

const store = RedisStore(session);

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

const sessionOpts = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000, httpOnly: false },
  store: new store({ url: process.env.REDIS_URL }),
  saveUninitialized: false,
  name: 'zelda',
  resave: false
};

const corsOptions = {
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'https://zeldaplay/herokuapp.com'
  ],
  credentials: true
};

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    CorsMiddleware.configure(corsOptions);
    ExpressSessionMiddleware.configure(sessionOpts);
    MorganMiddleware.configure(morganFormat);
    consumer
      .apply(
        HelmetMiddleware,
        CorsMiddleware,
        ExpressSessionMiddleware,
        MorganMiddleware
      )
      .forRoutes('*');
  }
}
