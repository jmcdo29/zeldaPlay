import { INestApplication } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import * as compression from 'compression';
import * as store from 'connect-redis';
import * as rateLimiter from 'express-rate-limit';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as redis from 'redis';
import { ConfigService } from './app/config/config.service';

const RedisStore = store(session);

export function configure(
  app: INestApplication,
  config: ConfigService,
  logger: OgmaService,
): void {
  app.use(
    session({
      store: new RedisStore({
        client: redis.createClient({
          url: config.redisUrl,
        }) as any,
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: config.isProd,
        httpOnly: config.isProd,
        secure: config.isProd,
        maxAge: config.cookieAge,
      },
    }),
    helmet(),
    compression(),
    rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.rateLimit,
    }),
    passport.initialize(),
    passport.session(),
  );
  app.setGlobalPrefix(config.globalPrefix);
  logger.log('Application Configuration complete', 'ApplicationConfig');
}
