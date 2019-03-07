import { MiddlewareConsumer, Module } from '@nestjs/common';

import { MyHelmet } from './helmet';
import { MyMorgan } from './morgan';

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyHelmet, MyMorgan).forRoutes('*');
  }
}
