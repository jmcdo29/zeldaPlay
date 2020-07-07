import { Module } from '@nestjs/common';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { ClientOpts } from 'redis';
import { RedisCoreModule } from './redis-core.module';

@Module({})
export class RedisModule {
  static forRoot(options: ClientOpts) {
    return RedisCoreModule.forRoot(RedisCoreModule, options);
  }

  static forRootAsync(options: AsyncModuleConfig<ClientOpts>) {
    return RedisCoreModule.forRootAsync(RedisCoreModule, options);
  }

  static Deferred = RedisCoreModule.Deferred;
}
