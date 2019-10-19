import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface DatabaseModuleOptions {
  connectionUrl: string;
  ssl?: boolean;
}

export interface DatabaseOptionsFactory {
  createDatabaseOptions():
    | Promise<DatabaseModuleOptions>
    | DatabaseModuleOptions;
}

export interface DatabaseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<DatabaseOptionsFactory>;
  useClass?: Type<DatabaseOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DatabaseModuleOptions> | DatabaseModuleOptions;
  inject?: any[];
}

export interface DatabaseFeatureOptions {
  tableName: string;
}
