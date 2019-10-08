import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtModuleConfig implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.getJwtSecret(),
      signOptions: {
        expiresIn: this.configService.getJwtExpiresIn(),
      },
    };
  }
}
