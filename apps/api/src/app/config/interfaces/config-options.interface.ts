import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface ConfigModuleOptions {
  fileName?: string;
  useProcess?: boolean;
}

export interface ConfigOptionsFactory {
  createConfigOptions(): Promise<ConfigModuleOptions> | ConfigModuleOptions;
}

export interface ConfigModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ConfigOptionsFactory>;
  useClass?: Type<ConfigOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ConfigModuleOptions> | ConfigModuleOptions;
  inject?: any[];
}
