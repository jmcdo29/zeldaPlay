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
  const logger = await app.resolve<LoggerService>(LoggerService);
  const port = config.getPort();
  const location = config.isProd()
    ? 'https://zeldaplay.herokuapp.com'
    : `http://localhost:${port}`;
  configure(app, config, logger);
  await app.listen(port);
  logger.log(
    `Listening at ${location}/${config.getGlobalPrefix()}`,
    'NestApplication',
  );
}

bootstrap();
