import { MiddlewareConsumer, Module } from '@nestjs/common';

import { MyCors } from './cors';
import { MyHelmet } from './helmet';
import { MyMorgan } from './morgan';

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyCors, MyHelmet, MyMorgan).forRoutes('*');
  }
}
