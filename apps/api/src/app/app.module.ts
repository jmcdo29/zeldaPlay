import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { AbilityScoreModule } from './ability-score/ability-score.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import {
  ConfigModuleConfig,
  DatabaseModuleConfig,
  OgmaModuleConfig,
} from './options';
import { SpellModule } from './spell/spell.module';

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
    AuthModule,
    CharacterModule,
    AbilityScoreModule,
    SpellModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
