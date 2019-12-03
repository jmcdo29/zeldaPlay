import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
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
  TerminusOptionsService,
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
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    AuthModule,
    CharacterModule,
    AbilityScoreModule,
    SpellModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
