import { Provider, Scope } from '@nestjs/common';
import { Pool } from 'pg';
import { LoggerService } from '../logger/logger.service';
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
    useFactory: async (
      options: DatabaseModuleOptions,
      logger: LoggerService,
    ) => {
      const pool = new Pool({
        ssl: options.ssl,
        connectionString: options.connectionUrl,
      });
      try {
        await pool.connect();
      } catch (err) {
        logger.error(err.message, err.stack);
        process.exit(1);
      }
      return pool;
    },
    inject: [DATABASE_MODULE_OPTIONS, LoggerService],
  };
}
