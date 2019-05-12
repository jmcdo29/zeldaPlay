import { NestFactory } from '@nestjs/core';
import { scribe } from 'mc-scribe';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port;
  await app.listen(port, () => {
    scribe.info(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
