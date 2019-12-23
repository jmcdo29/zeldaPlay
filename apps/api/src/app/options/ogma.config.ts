import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { OgmaModuleOptions } from 'nestjs-ogma';
import { ConfigService } from '../config/config.service';

@Injectable()
export class OgmaModuleConfig
  implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
      logLevel: this.configService.getLogLevel(),
      color: !this.configService.isProd(),
      application: this.configService.getApplicationName(),
      json: this.configService.isProd(),
    };
  }
}
