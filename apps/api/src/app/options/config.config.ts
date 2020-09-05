import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { ConfigModuleOptions } from '../config/interfaces/config-options.interface';

@Injectable()
export class ConfigModuleConfig
  implements ModuleConfigFactory<ConfigModuleOptions> {
  createModuleConfig(): ConfigModuleOptions {
    return {
      fileName: '.env',
      useProcess: process.env.USE_PROCESS
        ? JSON.parse(process.env.USE_PROCESS)
        : false,
    };
  }
}
