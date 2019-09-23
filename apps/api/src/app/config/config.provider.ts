import { Provider } from '@nestjs/common';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';

export function createConfigProvider(options: ConfigModuleOptions): Provider[] {
  return [
    {
      provide: CONFIG_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
