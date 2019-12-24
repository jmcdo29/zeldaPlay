import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as store from 'connect-redis';
import * as rateLimiter from 'express-rate-limit';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { OgmaService } from 'nestjs-ogma';
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
        }),
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
    morgan(config.morganString, {
      skip: (req: any, res: any) =>
        (config.isProd && req.statusCode < 400) || req.url.includes('callback'),
      stream: {
        write: (value: string) => logger.log(value.trim(), morgan.name),
      },
    }),
    helmet(),
    compression(),
    new rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.rateLimit,
    }),
    passport.initialize(),
    passport.session(),
  );
  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  logger.log('Application Configuration complete', 'ApplicationConfig');
}
