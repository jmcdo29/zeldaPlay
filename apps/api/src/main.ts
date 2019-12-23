import { NestFactory } from '@nestjs/core';
import { OgmaService } from 'nestjs-ogma';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { configure } from './config.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const config = app.get<ConfigService>(ConfigService);
  const logger = await app.resolve<OgmaService>(OgmaService);
  app.useLogger(logger);
  const port = config.getPort();
  configure(app, config, logger);
  await app.listen(port);
  logger.log(`Listening at ${await app.getUrl()}`, 'NestApplication');
}

bootstrap();
