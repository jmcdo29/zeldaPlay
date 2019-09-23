import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as rateLimiter from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { ConfigService } from './app/config/config.service';
import { MyLogger } from './app/logger/logger.service';

export function configure(app: INestApplication, config: ConfigService): void {
  const morganFormat = config.isProd() ? 'combined' : 'dev';
  app.use(
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
  );
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  MyLogger.log('Application Configuration complete', 'ApplicationConfig');
}
