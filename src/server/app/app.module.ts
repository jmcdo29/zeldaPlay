import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthModule } from '@Auth/auth.module';
import { CharacterModule } from '@Character/character.module';
import { UserModule } from '@User/user.module';
import { AppController } from './app.controller';
import { MiddlewareModule } from './middleware/middleware.module';

@Module({
  controllers: [AppController],
  imports: [
    MiddlewareModule,
    CharacterModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV !== 'dev',
      entities: [__dirname + '/entities/*.{js,ts}'],
      schema: 'public'
    }),
    UserModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {
  constructor(private readonly connetion: Connection) {}
}
