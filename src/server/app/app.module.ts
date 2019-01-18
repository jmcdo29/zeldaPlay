import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';
import { ZeldaplayModule } from './zeldaplay/zeldaplay.module';

@Module({
  controllers: [AppController],
  imports: [MiddlewareModule, UserModule, ZeldaplayModule]
})
export class AppModule {}
