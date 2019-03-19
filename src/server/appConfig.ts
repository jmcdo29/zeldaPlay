import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { scribe } from 'mc-scribe';
import * as morgan from 'morgan';
import { join } from 'path';

import { MyLogger } from './app/logger/logger.service';
import { configSwagger } from './swagger';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

export function configure(app: INestApplication & NestFastifyApplication) {
  app.useLogger(app.get(MyLogger));
  app.enableCors({
    origin: [/localhost:*/, 'https://zeladplay.herokuapp.com/']
  });
  const rootPath = join(__dirname, '../../');
  app.useStaticAssets({ root: rootPath });
  app.use(
    morgan(morganFormat, {
      skip: (req, res) => morganFormat === 'combined' && req.statusCode < 400,
      stream: {
        write: (value) => scribe('INFO', value)
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
