import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { JwtModuleConfig } from '../options/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'google',
      authType: 'reauthenticate',
      prompt: 'select_account',
    }),
    JwtModule.registerAsync({
      useClass: JwtModuleConfig,
      imports: [ConfigModule.externallyConfigured(ConfigModule, 0)],
    }),
    forwardRef(() => UserModule),
    ConfigModule.externallyConfigured(ConfigModule, 0),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    SessionSerializer,
    GoogleStrategy,
  ],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
