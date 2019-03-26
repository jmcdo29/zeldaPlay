import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SharedServerModule } from '@Shared/shared.module';
import { AppController } from './app.controller';
import {
  BadRequestFilter,
  NotFoundFilter,
  UnauthorizedFilter
} from './filters/index';
import { MetricsInterceptor } from './interceptors/index';
import { LoggerModule } from './logger/logger.module';
import { QuestionModule } from './question/question.module';
import { UserServerModule } from './user/user.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

import { HealthModule } from './health/health.module';

@Module({
  controllers: [AppController],
  imports: [
    ZeldaplayModule,
    SharedServerModule,
    UserServerModule,
    LoggerModule,
    QuestionModule,
    HealthModule
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
