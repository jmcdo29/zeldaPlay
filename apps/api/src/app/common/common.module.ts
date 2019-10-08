import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigModuleConfig } from '../options';

@Module({
  imports: [
    ConfigModule.forRootAsync({
      useClass: ConfigModuleConfig,
    }),
  ],
  exports: [ConfigModule],
})
export class CommonModule {}
