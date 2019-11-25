import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces/logger-options.interface';
import { createLoggerProvider, createLoggerService } from './logger.provider';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static forFeature(configs: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [createLoggerProvider(configs), createLoggerService()],
      exports: [LoggerService],
    };
  }
}
