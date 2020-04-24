import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { OgmaModuleOptions } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { ConfigService } from '../config/config.service';

@Injectable()
export class OgmaModuleConfig
  implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
      service: {
        logLevel: this.configService.logLevel,
        color: !this.configService.isProd,
        application: this.configService.applicationName,
        json: this.configService.isProd,
      },
      interceptor: {
        http: ExpressParser,
      },
    };
  }
}
