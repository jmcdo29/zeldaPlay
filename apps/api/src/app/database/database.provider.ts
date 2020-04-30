import { Provider } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import { Pool } from 'pg';
import {
  DATABASE_FEATURE,
  DATABASE_MODULE_OPTIONS,
  DATABASE_POOL,
} from './database.constants';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

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
    inject: [
      DATABASE_MODULE_OPTIONS,
      'OGMA_SERVICE:DatabaseConnectionProvider',
    ],
  };
}

export function createDatabaseProviderToken(tableName: string): string {
  return `${DATABASE_FEATURE}:${tableName}`;
}

export function createDatabaseProviders(
  feature: DatabaseFeatureOptions,
): Provider[] {
  const token = createDatabaseProviderToken(feature.tableName);
  return [
    {
      inject: [DATABASE_POOL, 'OGMA_SERVICE:DatabaseService'],
      provide: token,
      useFactory: (pool: Pool, ogmaService: OgmaService) => {
        return new DatabaseService(pool, feature, ogmaService);
      },
    },
  ];
}
