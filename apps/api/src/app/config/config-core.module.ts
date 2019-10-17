import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { createConfigProvider } from './config.provider';
import {
  ConfigModuleAsyncOptions,
  ConfigModuleOptions,
  ConfigOptionsFactory,
} from './interfaces/config-options.interface';

@Module({})
export class ConfigCoreModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigCoreModule,
      providers: createConfigProvider(options),
      exports: [CONFIG_MODULE_OPTIONS],
    };
  }

  static forRootAsync(options: ConfigModuleAsyncOptions): DynamicModule {
    return {
      module: ConfigCoreModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
      exports: [CONFIG_MODULE_OPTIONS],
    };
  }

  private static createAsyncProviders(
    options: ConfigModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProviders(options)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProviders(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }
    throw new Error('Invalid ConfigModule configuration.');
  }

  private static createAsyncOptionsProviders(
    options: ConfigModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CONFIG_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: CONFIG_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ConfigOptionsFactory) =>
        await optionsFactory.createConfigOptions(),
      inject: [options.useExisting || options.useClass || ''],
    };
  }
}
