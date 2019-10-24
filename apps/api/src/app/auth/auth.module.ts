import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { JwtModuleConfig } from '../options/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      useClass: JwtModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    forwardRef(() => UserModule),
    ConfigModule.Deferred,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
