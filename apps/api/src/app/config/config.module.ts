import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { createConfigProvider } from './config.provider';
import { ConfigService } from './config.service';
import {
  ConfigModuleAsyncOptions,
  ConfigModuleOptions,
  ConfigOptionsFactory,
} from './interfaces/config-options.interface';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: createConfigProvider(options),
    };
  }

  static forRootAsync(options: ConfigModuleAsyncOptions): DynamicModule {
    return {
      module: ConfigModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: ConfigModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProviders(options)];
    }
    return [
      this.createAsyncOptionsProviders(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
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
      inject: [options.useExisting || options.useClass],
    };
  }
}
