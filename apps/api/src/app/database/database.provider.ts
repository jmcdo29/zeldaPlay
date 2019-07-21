import { Provider } from '@nestjs/common';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';

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
