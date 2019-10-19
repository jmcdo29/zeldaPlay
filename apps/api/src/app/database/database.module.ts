import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCoreModule } from './database-core.module';
// import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { createDatabaseFeatureProvider } from './database.provider';
import { DatabaseService } from './database.service';
import {
  DatabaseFeatureOptions,
  DatabaseModuleAsyncOptions,
  DatabaseModuleOptions,
  // DatabaseOptionsFactory,
} from './interfaces/database-options.interface';

@Module({
  imports: [LoggerModule.forFeature({ context: DatabaseService.name })],
})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return DatabaseCoreModule.forRoot(options);
  }

  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    return DatabaseCoreModule.forRootAsync(options);
  }

  static forFeature(options: DatabaseFeatureOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [DatabaseCoreModule.Deferred],
      providers: [...createDatabaseFeatureProvider(options), DatabaseService],
      exports: [DatabaseService],
    };
  }

  /* private static createAsyncProviders(
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
  } */
}
