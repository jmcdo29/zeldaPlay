import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as redis from 'connect-redis';
import * as session from 'express-session';
import * as morgan from 'morgan';
import { ConfigService } from './app/config/config.service';
import { MyLogger } from './app/logger/logger.service';

const RedisStore = redis(session);

export function configure(app: INestApplication, config: ConfigService): void {
  const morganFormat = config.isProd() ? 'combined' : 'dev';
  app.use(
    morgan(morganFormat, {
      skip: (req: any, res: any) =>
        morganFormat === 'combined' && req.statusCode < 400,
      stream: {
        write: (value: string) => MyLogger.log(value.trim(), 'Morgan')
      }
    }),
    session({
      secret: config.get('SESSION_SECRET'),
      cookie: {
        maxAge: 60 * 60 * 1000
      },
      resave: true,
      saveUninitialized: false,
      store: new RedisStore({ url: config.get('REDIS_URL') })
    })
  );
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  MyLogger.log('Application Configuration complete', 'ApplicationConfig');
}
