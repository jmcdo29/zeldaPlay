import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { createDatabaseProvider } from './database.provider';
import { DatabaseService } from './database.service';
import {
  DatabaseModuleAsyncOptions,
  DatabaseModuleOptions,
  DatabaseOptionsFactory,
} from './interfaces/database-options.interface';

@Global()
@Module({
  imports: [LoggerModule.forFeature({ context: DatabaseService.name })],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: createDatabaseProvider(options),
    };
  }

  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: DatabaseModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }
    throw new Error('Invalid DatabaseModule configuration.');
  }

  private static createAsyncOptionsProvider(
    options: DatabaseModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: DATABASE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: DATABASE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: DatabaseOptionsFactory) =>
        await optionsFactory.createDatabaseOptions(),
      inject: [options.useExisting || options.useClass || ''],
    };
  }
}
