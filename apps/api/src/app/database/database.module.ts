import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCoreModule } from './database-core.module';
import { createDatabaseFeatureProvider } from './database.provider';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

@Module({
  imports: [LoggerModule.forFeature({ context: DatabaseService.name })],
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
      imports: [DatabaseCoreModule.Deferred],
      providers: [...createDatabaseFeatureProvider(options), DatabaseService],
      exports: [DatabaseService],
    };
  }
}
