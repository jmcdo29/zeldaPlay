import { Provider, Scope } from '@nestjs/common';
import { DATABASE_FEATURE } from './database.constants';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

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
