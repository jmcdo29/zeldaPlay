import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CookieModule } from '../cookie/cookie.module';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleModule } from './google/google.module';
import { OauthController } from './oauth.controller';
import { UsersController } from './user/user.controller';
import { LocalModule } from './local/local.module';

@Module({
  imports: [
    ConfigModule.Deferred,
    RedisModule.Deferred,
    GoogleModule,
    CookieModule,
    LocalModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController, OauthController, UsersController],
})
export class AuthModule {}
