import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigService } from '../config/config.service';

const databaseServiceFactory = {
  provide: DatabaseService,
  useFactory: (configService: ConfigService) => {
    return new DatabaseService(configService.get('DATABASE_URL'), configService.isProd());
  },
  inject: [ConfigService]
}

@Global()
@Module({
  providers: [databaseServiceFactory]
})
export class DatabaseModule {}
