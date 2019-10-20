import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface DatabaseTestOptions {
  fileName: string;
}

export interface DatabaseTestOptionsFactory {
  createDatabaseOptions(): Promise<DatabaseTestOptions> | DatabaseTestOptions;
}
export interface DatabaseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<DatabaseTestOptionsFactory>;
  useClass?: Type<DatabaseTestOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DatabaseTestOptions> | DatabaseTestOptions;
  inject?: any[];
}
