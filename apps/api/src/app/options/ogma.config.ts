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
      ...this.configService.ogmaConfig,
      interceptor: {
        http: ExpressParser,
      },
    };
  }
}
