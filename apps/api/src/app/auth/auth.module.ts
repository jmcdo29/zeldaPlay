import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OgmaModule } from 'nestjs-ogma';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { PassportModuleConfig } from '../options/passport.config';
import { AuthController } from './auth/auth.controller';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { GoogleUserService } from './google-user/google-user.service';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserService } from './user/user.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      useClass: PassportModuleConfig,
    }),
    ConfigModule.Deferred,
    DatabaseModule.forFeature({ tableName: 'players' }),
    OgmaModule.forFeature(UserService.name),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    SessionSerializer,
    GoogleStrategy,
    GoogleUserService,
    UserService,
  ],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
