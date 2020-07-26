import { Provider } from '@nestjs/common';
import { createProviderToken, OgmaService } from '@ogma/nestjs-module';
import { Pool } from 'pg';
import { from } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
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
      return from(pool.connect())
        .pipe(
          retryWhen((e) =>
            e.pipe(
              scan((errorCount: number, error: Error) => {
                logger.warn(
                  `Unable to connect to database. ${error.message}. Retrying ${
                    errorCount + 1
                  }...`,
                );
                if (errorCount + 1 > 9) {
                  throw error;
                }
                return errorCount + 1;
              }, 0),
              delay(1 * 1000),
            ),
          ),
        )
        .toPromise();
    },
    inject: [
      DATABASE_MODULE_OPTIONS,
      createProviderToken('DatabaseConnectionProvider'),
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
      inject: [DATABASE_POOL, createProviderToken(DatabaseService.name)],
      provide: token,
      useFactory: (pool: Pool, ogmaService: OgmaService) => {
        return new DatabaseService(pool, feature, ogmaService);
      },
    },
  ];
}
