import 'reflect-metadata';

import { config } from 'dotenv';
import { join } from 'path';
config();

import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { scribe } from 'mc-scribe';
import { AppModule } from './app/app.module';
import { configSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4000',
      'https://zeldaplay.herokuapp.com'
    ],
    credentials: true
  });
  const rootPath = join(__dirname, '..', 'client');
  app.useStaticAssets({ root: rootPath });
  const options = configSwagger();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'ZeldaPlay'
  });
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  scribe('INFO', `Application stated on ${process.env.PORT}.`);
}

bootstrap();
