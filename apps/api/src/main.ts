import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { SpelunkerModule } from 'nestjs-spelunker';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { configure } from './config.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);
  const port = config.port;
  configure(app, config, logger);
  SpelunkerModule.explore(app, logger);
  await app.listen(port);
  logger.log(`Listening at ${await app.getUrl()}`, 'NestApplication');
}

bootstrap();
