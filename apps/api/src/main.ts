import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { configure } from './config.main';
import { goSpelunking } from './spelunk';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    process.env.NODE_ENV === 'production' ? { logger: false } : {},
  );
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);
  const port = config.port;
  configure(app, config, logger);
  await goSpelunking(app);
  await app.listen(port);
  logger.log(`Listening at ${await app.getUrl()}`, 'NestApplication');
}

bootstrap();
