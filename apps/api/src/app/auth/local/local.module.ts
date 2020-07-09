import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from '../user/user.service';
import { LocalService } from './local.service';

@Module({
  imports: [
    DatabaseModule.forFeature({ tableName: 'players' }),
    OgmaModule.forFeature(UserService),
  ],
  providers: [LocalService, UserService],
  exports: [LocalService, UserService],
})
export class LocalModule {}
