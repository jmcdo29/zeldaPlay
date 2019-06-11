import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as morgan from 'morgan';
import { ConfigService } from './app/config/config.service';
import { MyLogger } from './app/logger/logger.service';

export function configure(app: INestApplication, config: ConfigService): void {
  const globalPrefix = 'api';
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
      saveUninitialized: false
    })
  );
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
}
