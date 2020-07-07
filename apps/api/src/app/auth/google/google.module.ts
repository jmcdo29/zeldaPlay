import { HttpModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [
    ConfigModule.Deferred,
    DatabaseModule.forFeature({ tableName: 'players' }),
    HttpModule,
    RedisModule.Deferred,
  ],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
