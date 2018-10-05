import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';


@Module({
  controllers: [AppController],
  imports: [MiddlewareModule, CharacterModule, UserModule],
  providers: [AppService]
})
export class AppModule {}
