import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [AuthModule, DatabaseModule.forFeature({ tableName: 'characters' })],
  providers: [CharacterService],
  controllers: [CharactersController],
})
export class CharacterModule {}
