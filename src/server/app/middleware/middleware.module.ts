import { MiddlewareConsumer, Module } from '@nestjs/common';

import { MyCorsMiddleware } from './cors';
import { MyHelmetMiddleware } from './helmet';
import { MyMorganMiddleware } from './morgan';
import { MySessionMiddleware } from './session';

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        MyHelmetMiddleware,
        MyCorsMiddleware,
        MyMorganMiddleware,
        MySessionMiddleware
      )
      .forRoutes('*');
  }
}
