import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { DynamicModule, Module } from '@nestjs/common';
import { GoogleCoreModule } from './google-core.module';
import { GoogleModuleOptions } from './google.interface';

@Module({})
export class GoogleModule {
  static forRoot(options: GoogleModuleOptions): DynamicModule {
    return GoogleCoreModule.forRoot(GoogleCoreModule, options);
  }

  static forRootAsync(
    options: AsyncModuleConfig<GoogleModuleOptions>,
  ): DynamicModule {
    return GoogleCoreModule.forRootAsync(GoogleCoreModule, options);
  }

  static Deferred = GoogleCoreModule.Deferred;
}
