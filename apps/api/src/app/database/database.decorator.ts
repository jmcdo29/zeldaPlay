import { Inject } from '@nestjs/common';
import { createDatabaseProviderToken } from './database.provider';

export const DatabaseTable = (tableName: string) => {
  return Inject(createDatabaseProviderToken(tableName));
};
