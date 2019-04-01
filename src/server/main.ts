import 'reflect-metadata';

import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
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
    MyLogger.log(`Application stated on ${HOST}:${PORT}.`, 'Main');
  } catch (err) {
    MyLogger.error(err.message, err.stack, 'Main');
    process.exit(0);
  }
}

bootstrap();

// this should really only happen in dev, because I clean the dist folder, but I'm tired of fixing it
// so it is happening programmatically
process.on('unhandledRejection', (err: Error) => {
  MyLogger.error(err.message, err.stack, 'UnhandledRejection');
  if (err.message.includes('root')) {
    mkdirSync(join(__dirname, '..', 'client'));
    MyLogger.debug('Restarting the server.', 'UnhandledRejection');
    bootstrap();
  }
});
