import 'reflect-metadata';

import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { scribe } from 'mc-scribe';
import { AppServerModule } from './app/app.module';
import { MyLogger } from './app/logger/logger.service';
import { configure } from './appConfig';

import { mkdirSync } from 'fs';
import { join } from 'path';

const PORT = process.env.PORT;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppServerModule,
      new FastifyAdapter(),
      {
        logger: new MyLogger()
      }
    );
    configure(app);
    await app.listen(PORT, HOST);
    scribe('INFO', `Application stated on ${HOST}:${PORT}.`);
  } catch (err) {
    scribe('ERROR', err.message);
    scribe('FINE', err.stack);
    process.exit(0);
  }
}

bootstrap();

// this should really only happen in dev, because I clean the dist folder, but I'm tired of fixing it
// so it is happening programmatically
process.on('unhandledRejection', (err: any) => {
  scribe('ERROR', err);
  if (err.message.includes('root"')) {
    scribe('ERROR', 'Missing root error');
    mkdirSync(join(__dirname, '..', 'client'));
    bootstrap();
  }
});
