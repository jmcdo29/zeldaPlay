import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { GraphQLModuleConfig } from './graphql.config';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphQLModuleConfig,
      inject: [ConfigService]
    }),
    ConfigModule,
    DatabaseModule,
    UserModule,
    LoggerModule,
    AuthModule,
    CharacterModule
  ],
  controllers: [],
  providers: [AppService, AppResolver]
})
export class AppModule {}
