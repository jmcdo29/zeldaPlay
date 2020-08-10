import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { DynamicModule, Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { DatabaseCoreModule } from './database-core.module';
import {
  createDatabasePoolConnection,
  createDatabaseProviders,
} from './database.provider';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const dbModule = DatabaseCoreModule.forRoot(DatabaseCoreModule, options);
    dbModule.imports = dbModule.imports.concat(
      OgmaModule.forFeature(DatabaseService),
    );
    return dbModule;
  }

  static forRootAsync(
    options: AsyncModuleConfig<DatabaseModuleOptions>,
  ): DynamicModule {
    const dbModule = DatabaseCoreModule.forRootAsync(
      DatabaseCoreModule,
      options,
    );
    dbModule.imports = dbModule.imports.concat(
      OgmaModule.forFeature(DatabaseService),
    );
    return dbModule;
  }

  static forFeature(options: DatabaseFeatureOptions): DynamicModule {
    const databaseProvider = createDatabaseProviders(options);
    return {
      module: DatabaseModule,
      imports: [
        DatabaseCoreModule.Deferred,
        OgmaModule.forFeature(DatabaseService),
        OgmaModule.forFeature('DatabaseConnectionProvider'),
      ],
      providers: [createDatabasePoolConnection(), ...databaseProvider],
      exports: [...databaseProvider],
    };
  }
}
