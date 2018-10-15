import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    MiddlewareModule,
    CharacterModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      synchronize: true,
      entities: [__dirname + '/entities/*.{js,ts}'],
      schema: 'zeldaplay'
    }),
    UserModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {
  constructor(private readonly connetion: Connection) {}
}
