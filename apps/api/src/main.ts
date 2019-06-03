import { NestFactory } from '@nestjs/core';
import { scribe } from 'mc-scribe';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  await app.listen(port);
  scribe.info(`Listening at http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
