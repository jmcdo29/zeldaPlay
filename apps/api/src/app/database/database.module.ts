import { Global, Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { DatabaseService } from './database.service';

const databaseServiceFactory = {
  provide: DatabaseService,
  useFactory: (configService: ConfigService) => {
    return new DatabaseService(
      configService.get('DATABASE_URL'),
      configService.isProd()
    );
  },
  inject: [ConfigService]
};

@Global()
@Module({
  providers: [databaseServiceFactory]
})
export class DatabaseModule {}
