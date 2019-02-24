import 'reflect-metadata';

import { config } from 'dotenv';
import { join } from 'path';
config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { consoleLogger as scribe } from 'mc-scribe';
import { AppModule } from './app/app.module';
import { NotFoundExceptionFilter } from './notFoundException.filter';
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
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(process.env.PORT);
  scribe('INFO', `Application stated on ${process.env.PORT}.`);
}

bootstrap();
