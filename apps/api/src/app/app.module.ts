import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { GraphQLModuleConfig } from './options/graphql.config';
import { TerminusOptionsService } from './options/terminusOptionsService';
import { UserModule } from './user/user.module';
import { AbilityScoreModule } from './ability-score/ability-score.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LoggerModule,
    GraphQLModule.forRootAsync({
      useClass: GraphQLModuleConfig,
      inject: [ConfigService]
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService
    }),
    AuthModule,
    CharacterModule,
    UserModule,
    AbilityScoreModule
  ],
  providers: [AppService, AppResolver]
})
export class AppModule {}
