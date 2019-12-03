import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { JwtModuleConfig } from '../options/jwt.config';
import { AuthController } from './auth/auth.controller';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { GoogleUserService } from './google-user/google-user.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { UserService } from './user/user.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'google',
      authType: 'reauthenticate',
      prompt: 'select_account',
      session: true,
    }),
    JwtModule.registerAsync({
      useClass: JwtModuleConfig,
      imports: [ConfigModule.externallyConfigured(ConfigModule, 0)],
    }),
    ConfigModule.externallyConfigured(ConfigModule, 0),
    DatabaseModule.forFeature({ tableName: 'players' }),
    LoggerModule.forFeature({ context: UserService.name }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
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
