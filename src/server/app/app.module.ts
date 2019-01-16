import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@User/user.module';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { SharedModule } from './shared/shared.module';
import { UtilsModule } from './utils/utils.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [
    MiddlewareModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV !== 'dev',
      entities: [__dirname + '/entities/*.{js,ts}'],
      schema: 'public'
    }),
    UserModule,
    ZeldaplayModule,
  ]
})
export class AppModule {}
