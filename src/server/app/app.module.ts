import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SharedModule } from '@Shared/shared.module';
import { AppController } from './app.controller';
import {
  BadRequestFilter,
  NotFoundExceptionFilter,
  UnauthorizedFilter
} from './filters/index';
import { MetricsInterceptor } from './interceptors/index';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [SharedModule, MiddlewareModule, UserModule, ZeldaplayModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedFilter
    }
  ]
})
export class AppModule {}
