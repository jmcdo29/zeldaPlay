import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as store from 'connect-redis';
import * as rateLimiter from 'express-rate-limit';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as redis from 'redis';
import { ConfigService } from './app/config/config.service';
import { MyLogger } from './app/logger/logger.service';

const RedisStore = store(session);

export function configure(app: INestApplication, config: ConfigService): void {
  const morganFormat = config.isProd() ? 'combined' : 'dev';
  app.use(
    session({
      store: new RedisStore({
        client: redis.createClient({
          url: config.get('REDIS_URL'),
        }),
      }),
      secret: config.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
    morgan(morganFormat, {
      skip: (req: any, res: any) => config.isProd() && req.statusCode < 400,
      stream: {
        write: (value: string) => MyLogger.log(value.trim(), 'Morgan'),
      },
    }),
    helmet(),
    compression(),
    new rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.getRateLimit(),
    }),
    passport.initialize(),
    passport.session(),
  );
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  MyLogger.log('Application Configuration complete', 'ApplicationConfig');
}
