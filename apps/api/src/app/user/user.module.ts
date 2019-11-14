import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { GoogleUserService } from './google-user/google-user.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    LoggerModule.forFeature({ context: UserService.name }),
    DatabaseModule.forFeature({ tableName: 'players' }),
  ],
  providers: [UserService, UserResolver, GoogleUserService],
  exports: [UserService, GoogleUserService],
})
export class UserModule {}
