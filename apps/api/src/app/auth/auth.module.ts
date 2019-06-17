import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

const jwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES')
    }
  }),
  inject: [ConfigService]
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    UserModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
