import { NestFactory } from '@nestjs/core';
import { scribe } from 'mc-scribe';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { MyLogger } from './app/logger/logger.service';
import { configure } from './config.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger()
  });
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  configure(app, config);
  await app.listen(port);
  scribe.info(`Listening at http://localhost:${port}`);
}

bootstrap();
