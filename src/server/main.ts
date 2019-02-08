// tslint:disable-next-line:no-var-requires
// require('module-alias/register');
import 'reflect-metadata';

import { config } from 'dotenv';
import { join } from 'path';
config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { consoleLogger as scribe } from 'mc-scribe';
import { AppModule } from './app/app.module';
import { configSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootPath = join(__dirname, '../client');
  app.useStaticAssets(rootPath);
  const options = configSwagger();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'ZeldaPlay'
  });
  app.use(compression());
  await app.listen(process.env.PORT);
  scribe('INFO', `Application stated on ${process.env.PORT}.`);
}

bootstrap();
