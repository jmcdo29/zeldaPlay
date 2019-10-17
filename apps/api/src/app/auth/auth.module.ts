import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { CommonModule } from '../common/common.module';
import { ConfigModule } from '../config/config.module';
import { JwtModuleConfig } from '../options/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JwtModuleConfig,
      imports: [ConfigModule],
    }),
    forwardRef(() => UserModule),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
