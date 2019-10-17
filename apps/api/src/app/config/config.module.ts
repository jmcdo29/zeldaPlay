import { DynamicModule, Module } from '@nestjs/common';
import { ConfigCoreModule } from './config-core.module';
import { ConfigService } from './config.service';
import {
  ConfigModuleAsyncOptions,
  ConfigModuleOptions,
} from './interfaces/config-options.interface';

@Module({
  imports: [ConfigCoreModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      imports: [ConfigCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: ConfigModuleAsyncOptions): DynamicModule {
    console.log('Calling ConfigModule.forRootAsync');
    return {
      module: ConfigModule,
      imports: [ConfigCoreModule.forRootAsync(options)],
    };
  }
}
