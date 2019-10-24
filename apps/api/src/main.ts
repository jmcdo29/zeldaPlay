import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';
import { LoggerService } from './app/logger/logger.service';
import { configure } from './config.main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  const config = app.get<ConfigService>(ConfigService);
  const port = config.getPort();
  const location = config.isProd()
    ? 'https://zeldaplay.herokuapp.com'
    : `http://localhost:${port}`;
  configure(app, config);
  await app.listen(port);
  LoggerService.log(
    `Listening at ${location}/${config.getGlobalPrefix()}`,
    'NestApplication',
  );
}

bootstrap();
