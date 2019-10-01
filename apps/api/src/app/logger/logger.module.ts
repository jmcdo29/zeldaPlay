import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces/logger-options.interface';
import { createLoggerProvider } from './logger.provider';
import { MyLogger } from './logger.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {
  static forFeature(configs: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: createLoggerProvider(configs),
    };
  }
}
