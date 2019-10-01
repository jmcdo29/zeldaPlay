import { Provider, Scope } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces/logger-options.interface';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';

export function createLoggerProvider(configs: LoggerModuleOptions): Provider[] {
  return [
    {
      provide: LOGGER_MODULE_OPTIONS,
      useValue: configs,
      scope: Scope.TRANSIENT,
    },
  ];
}
