import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';

@Module({})
export class DatabaseCoreModule extends createConfigurableDynamicRootModule<
  DatabaseCoreModule,
  DatabaseModuleOptions
>(DATABASE_MODULE_OPTIONS, {
  exports: [DATABASE_MODULE_OPTIONS],
}) {
  static Deferred = DatabaseCoreModule.externallyConfigured(
    DatabaseCoreModule,
    500,
  );
}
