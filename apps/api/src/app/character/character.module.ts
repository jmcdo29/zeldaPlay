import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';

@Module({
  imports: [AuthModule, DatabaseModule.forFeature({ tableName: 'characters' })],
  providers: [CharacterResolver, CharacterService],
})
export class CharacterModule {}
