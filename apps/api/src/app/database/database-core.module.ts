import { DynamicModule, Module, Provider } from '@nestjs/common';
import { interval, race, Subject } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { createDatabaseProvider } from './database.provider';
import {
  DatabaseModuleAsyncOptions,
  DatabaseModuleOptions,
  DatabaseOptionsFactory,
} from './interfaces/database-options.interface';

@Module({})
export class DatabaseCoreModule {
  private static moduleSubject = new Subject<DynamicModule>();

  private static timeout$ = interval(0).pipe(
    first(),
    map(() => {
      throw new Error(
        'Expected DatabaseModule to be configured by at last one Module but it was not configured.',
      );
    }),
  );

  static Deferred = race(
    DatabaseCoreModule.timeout$,
    DatabaseCoreModule.moduleSubject.pipe(take(1)),
  ).toPromise();

  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const databaseCoreModuleConfig = {
      module: DatabaseCoreModule,
      providers: createDatabaseProvider(options),
      exports: [DATABASE_MODULE_OPTIONS],
    };

    this.moduleSubject.next(databaseCoreModuleConfig);

    return databaseCoreModuleConfig;
  }

  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    const databaseCoreModuleConfig = {
      module: DatabaseCoreModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
      exports: [DATABASE_MODULE_OPTIONS],
    };

    this.moduleSubject.next(databaseCoreModuleConfig);

    return databaseCoreModuleConfig;
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
