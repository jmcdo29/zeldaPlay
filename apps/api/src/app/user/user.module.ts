import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    LoggerModule.forFeature({ context: UserService.name }),
    DatabaseModule.forFeature({ tableName: 'players' }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
