import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigService } from './config.service';
import { ConfigModuleOptions } from './interfaces/config-options.interface';

@Module({})
export class ConfigModule extends createConfigurableDynamicRootModule<
  ConfigModule,
  ConfigModuleOptions
>(CONFIG_MODULE_OPTIONS, {
  providers: [ConfigService],
  exports: [ConfigService],
}) {
  static Deferred = ConfigModule.externallyConfigured(ConfigModule, 0);
}
