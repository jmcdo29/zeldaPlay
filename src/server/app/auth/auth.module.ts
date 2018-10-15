import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@User/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
