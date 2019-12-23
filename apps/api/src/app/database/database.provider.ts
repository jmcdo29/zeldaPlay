import { Provider, Scope } from '@nestjs/common';
import { OgmaService } from 'nestjs-ogma';
import { Pool } from 'pg';
import {
  DATABASE_FEATURE,
  DATABASE_MODULE_OPTIONS,
  DATABASE_POOL,
} from './database.constants';
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
    useFactory: async (options: DatabaseModuleOptions, logger: OgmaService) => {
      const pool = new Pool({
        ssl: options.ssl,
        connectionString: options.connectionUrl,
      });
      try {
        await pool.connect();
      } catch (err) {
        logger.printError(err);
        process.exit(1);
      }
      return pool;
    },
    inject: [DATABASE_MODULE_OPTIONS, OgmaService],
  };
}
