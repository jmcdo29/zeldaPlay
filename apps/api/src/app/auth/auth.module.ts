import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OgmaModule } from '@ogma/nestjs-module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { PassportModuleConfig } from '../options/passport.config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { GoogleModule } from './google/google.module';
import { OauthController } from './oauth.controller';

@Module({
  imports: [
    PassportModule.registerAsync({
      useClass: PassportModuleConfig,
    }),
    ConfigModule.Deferred,
    DatabaseModule.forFeature({ tableName: 'players' }),
    OgmaModule.forFeature(UserService),
    GoogleModule,
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    LocalStrategy,
    SessionSerializer,
    UserService,
  ],
  exports: [PassportModule, AuthService],
  controllers: [AuthController, OauthController, UsersController],
})
export class AuthModule {}
