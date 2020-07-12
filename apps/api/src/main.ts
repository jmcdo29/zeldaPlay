import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { SpelunkerModule } from 'nestjs-spelunker';
import { writeFileSync } from 'fs';
import { join } from 'path';

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
  writeFileSync(
    join(process.cwd(), 'server.json'),
    Buffer.from(JSON.stringify(SpelunkerModule.explore(app), null, 2)),
  );
  await app.listen(port);
  logger.log(`Listening at ${await app.getUrl()}`, 'NestApplication');
}

bootstrap();
