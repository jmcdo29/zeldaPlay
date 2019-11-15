import { MakeConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';

@Module({
  exports: [DATABASE_MODULE_OPTIONS],
})
export class DatabaseCoreModule extends MakeConfigurableDynamicRootModule<
  DatabaseCoreModule,
  DatabaseModuleOptions
>(DATABASE_MODULE_OPTIONS) {
  static Deferred = DatabaseCoreModule.externallyConfigured(
    DatabaseCoreModule,
    500,
  );
}
