import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCoreModule } from './database-core.module';
import { createDatabaseFeatureProvider } from './database.provider';
import { DatabaseService } from './database.service';
import {
  DatabaseModuleAsyncOptions,
  DatabaseModuleOptions,
} from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

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
}
