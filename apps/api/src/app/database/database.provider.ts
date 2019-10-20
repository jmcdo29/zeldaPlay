import { Provider, Scope } from '@nestjs/common';
import {
  DATABASE_FEATURE,
  DATABASE_MODULE_OPTIONS,
} from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

export function createDatabaseProvider(
  options: DatabaseModuleOptions,
): Provider[] {
  return [
    {
      provide: DATABASE_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}

export function createDatabaseFeatureProvider(
  options: DatabaseFeatureOptions,
): Provider[] {
  return [
    {
      provide: DATABASE_FEATURE,
      useValue: options,
      scope: Scope.TRANSIENT,
    },
  ];
}
