import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { HttpModule, Module } from '@nestjs/common';
import { GOOGLE_OPTIONS } from './google.constants';
import { GoogleModuleOptions } from './google.interface';
import { GoogleService } from './google.service';
import { DatabaseModule } from '../../database/database.module';

@Module({})
export class GoogleCoreModule extends createConfigurableDynamicRootModule<
  GoogleCoreModule,
  GoogleModuleOptions
>(GOOGLE_OPTIONS, {
  imports: [DatabaseModule.forFeature({ tableName: 'players' }), HttpModule],
  providers: [GoogleService],
  exports: [GoogleService],
}) {
  static Deferred = GoogleCoreModule.externallyConfigured(GoogleCoreModule, 0);
}
