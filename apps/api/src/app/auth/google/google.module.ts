import { HttpModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    ConfigModule.Deferred,
    DatabaseModule.forFeature({ tableName: 'players' }),
    HttpModule,
  ],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
