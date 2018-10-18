import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';
import { JwtStrategy } from '@Auth/jwt.strategy';
import { UserModule } from '@User/user.module';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRE_TOKEN
      }
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
