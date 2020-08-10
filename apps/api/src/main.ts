import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { SpelunkerModule } from 'nestjs-spelunker';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { configure } from './config.main';

async function bootstrap() {
  const debugOutput = await SpelunkerModule.debug(AppModule);
  const app = await NestFactory.create(
    AppModule,
    process.env.NODE_ENV === 'production' ? { logger: false } : {},
  );
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);
  const port = config.port;
  configure(app, config, logger);
  const exploreOutput = SpelunkerModule.explore(app);
  writeFileSync(join(process.cwd(), 'debug.json'), JSON.stringify(debugOutput));
  writeFileSync(
    join(process.cwd(), 'server.json'),
    JSON.stringify(exploreOutput),
  );
  await app.listen(port);
  logger.log(`Listening at ${await app.getUrl()}`, 'NestApplication');
}

bootstrap();
