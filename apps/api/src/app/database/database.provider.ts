import { Provider, Scope } from '@nestjs/common';
import { Pool } from 'pg';
import {
  DATABASE_FEATURE,
  DATABASE_MODULE_OPTIONS,
  DATABASE_POOL,
} from './database.constants';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

export function createDatabaseFeatureProvider(
  options: DatabaseFeatureOptions,
): Provider {
  return {
    provide: DATABASE_FEATURE,
    useValue: options,
    scope: Scope.TRANSIENT,
  };
}

export function createDatabasePoolConnection(): Provider {
  return {
    provide: DATABASE_POOL,
    useFactory: (options: DatabaseModuleOptions) =>
      new Pool({
        ssl: options.ssl,
        connectionString: options.connectionUrl,
      }),
    inject: [DATABASE_MODULE_OPTIONS],
  };
}

export function createDatabaseService(): Provider {
  return {
    provide: DatabaseService,
    useClass: DatabaseService,
    scope: Scope.TRANSIENT,
  };
}
