import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [DbModule, MiddlewareModule, UserModule, ZeldaplayModule]
})
export class AppModule {}
