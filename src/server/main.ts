import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as path from 'path';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootPath = path.join(__dirname, '../client');
  app.useStaticAssets(rootPath);

  const options = new DocumentBuilder()
    .setTitle('ZeldaPlay')
    .setDescription('The zeldaplay API description')
    .setVersion('1.0')
    .addTag('character')
    .addTag('weapon')
    .addTag('user')
    .addTag('spell')
    .addTag('skill')
    .addTag('note')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, () => {
    console.log(`Application stated on ${process.env.PORT}.`);
  });
}

bootstrap();
