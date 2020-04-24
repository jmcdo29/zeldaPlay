import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OgmaModule } from '@ogma/nestjs-module';
import { AbilityScoreModule } from './ability-score/ability-score.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import {
  ConfigModuleConfig,
  DatabaseModuleConfig,
  GraphQLModuleConfig,
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
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: GraphQLModuleConfig,
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
  providers: [AppService, AppResolver],
})
export class AppModule {}
