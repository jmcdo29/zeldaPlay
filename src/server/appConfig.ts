import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { join } from 'path';

import { MyLogger } from './app/logger/logger.service';
import { configSwagger } from './swagger';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

export function configure(app: INestApplication & NestFastifyApplication) {
  app.enableCors({
    origin: [/localhost:*/, 'https://zeladplay.herokuapp.com/']
  });
  const rootPath = join(__dirname, '../client/');
  app.useStaticAssets({ root: rootPath });
  app.use(
    morgan(morganFormat, {
      skip: (req, res) => morganFormat === 'combined' && req.statusCode < 400,
      stream: {
        write: (value) => MyLogger.log(value.trim(), 'Morgan')
      }
    })
  );
  const options = configSwagger();
  const document = SwaggerModule.createDocument(app as any, options, {});
  SwaggerModule.setup('/api', app as any, document, {
    customSiteTitle: 'ZeldaPlay'
  });
  app.useGlobalPipes(new ValidationPipe());
}
