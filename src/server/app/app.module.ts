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
import { QuestionModule } from './question/question.module';
import { UserServerModule } from './user/user.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [
    ZeldaplayModule,
    SharedServerModule,
    UserServerModule,
    LoggerModule,
    QuestionModule,
    HealthModule,
    WebhooksModule
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
