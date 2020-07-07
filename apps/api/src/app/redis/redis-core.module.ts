import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { ClientOpts, createClient } from 'redis';
import { REDIS_INSTANCE, REDIS_OPTIONS } from './redis.constants';
import { RedisService } from './redis.service';

@Module({})
export class RedisCoreModule extends createConfigurableDynamicRootModule<
  RedisCoreModule,
  ClientOpts
>(REDIS_OPTIONS, {
  providers: [
    {
      provide: REDIS_INSTANCE,
      useFactory: (options: ClientOpts) => {
        return createClient(options);
      },
      inject: [REDIS_OPTIONS],
    },
    RedisService,
  ],
  exports: [RedisService],
}) {
  static Deferred = RedisCoreModule.externallyConfigured(RedisCoreModule, 0);
}
