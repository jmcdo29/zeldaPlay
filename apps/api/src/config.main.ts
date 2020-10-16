import { INestApplication } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ConfigService } from './app/config/config.service';

export function configure(
  app: INestApplication,
  config: ConfigService,
  logger: OgmaService,
): void {
  app.use(helmet(), compression());
  app.setGlobalPrefix(config.globalPrefix);
  logger.log('Application Configuration complete', 'ApplicationConfig');
}
