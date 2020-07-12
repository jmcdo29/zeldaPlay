import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CookieModule } from '../cookie/cookie.module';
import { GoogleModuleConfig } from '../options/google.config';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleModule } from './google/google.module';
import { LocalModule } from './local/local.module';
import { OauthController } from './oauth.controller';
import { UsersController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.Deferred,
    RedisModule.Deferred,
    GoogleModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: GoogleModuleConfig,
    }),
    CookieModule,
    LocalModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController, OauthController, UsersController],
})
export class AuthModule {}
