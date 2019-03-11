import {
  INestApplication,
  INestExpressApplication,
  INestFastifyApplication,
  ValidationPipe
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { join } from 'path';
import { MyLogger } from './app/logger/logger.service';
import { configSwagger } from './swagger';

export function configure(
  app:
    | INestApplication & INestFastifyApplication
    | INestApplication & INestExpressApplication
): void {
  app.useLogger(app.get(MyLogger));
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
  app.use(compression());
  const options = configSwagger();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'ZeldaPlay'
  });
  app.useGlobalPipes(new ValidationPipe());
}
