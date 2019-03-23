import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SharedServerModule } from '@Shared/shared.module';
import { AppController } from './app.controller';
import {
  BadRequestFilter,
  NotFoundFilter,
  UnauthorizedFilter
} from './filters/index';
import { HealthModule } from './health/health.module';
import { MetricsInterceptor } from './interceptors/index';
import { LoggerModule } from './logger/logger.module';
import { UserServerModule } from './user/user.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [
    HealthModule,
    SharedServerModule,
    UserServerModule,
    ZeldaplayModule,
    LoggerModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedFilter
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor
    }
  ]
})
export class AppServerModule {}
