import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    LoggerModule.forFeature({ context: UserService.name }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
