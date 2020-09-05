import { ValidationPipe } from '@marcj/marshal-nest';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { AbilityScoreModule } from './ability-score/ability-score.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from './config/config.module';
import { CookieModule } from './cookie/cookie.module';
import { DatabaseModule } from './database/database.module';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import {
  ConfigModuleConfig,
  DatabaseModuleConfig,
  OgmaModuleConfig,
  RedisModuleConfig,
} from './options';
import { SpellModule } from './spell/spell.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, {
      useClass: ConfigModuleConfig,
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: DatabaseModuleConfig,
    }),
    OgmaModule.forRootAsync({
      useClass: OgmaModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    RedisModule.forRootAsync({
      useClass: RedisModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    AuthModule,
    CharacterModule,
    AbilityScoreModule,
    SpellModule,
    CookieModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CookieInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
