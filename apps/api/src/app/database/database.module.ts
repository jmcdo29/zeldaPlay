import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { DynamicModule, Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { DatabaseCoreModule } from './database-core.module';
import {
  createDatabaseFeatureProvider,
  createDatabasePoolConnection,
} from './database.provider';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

@Module({
  imports: [OgmaModule.forFeature(DatabaseService)],
})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return DatabaseCoreModule.forRoot(DatabaseCoreModule, options);
  }

  static forRootAsync(
    options: AsyncModuleConfig<DatabaseModuleOptions>,
  ): DynamicModule {
    return DatabaseCoreModule.forRootAsync(DatabaseCoreModule, options);
  }

  static forFeature(options: DatabaseFeatureOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        DatabaseCoreModule.Deferred,
        OgmaModule.forFeature('DatabaseConnectionProvider'),
      ],
      providers: [
        createDatabaseFeatureProvider(options),
        DatabaseService,
        createDatabasePoolConnection(),
      ],
      exports: [DatabaseService],
    };
  }
}
