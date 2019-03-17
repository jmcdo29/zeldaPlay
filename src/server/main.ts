import 'reflect-metadata';

import { config } from 'dotenv';
config();

import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { scribe } from 'mc-scribe';
import { AppModule } from './app/app.module';
import { configure } from './appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
    logger: false
  });
  configure(app);
  await app.listen(process.env.PORT, process.env.NODE_ENV.toLowerCase() === 'production' ? '0.0.0.0' : '127.0.0.1');
  scribe('INFO', `Application stated on ${process.env.PORT}.`);
}

bootstrap();
