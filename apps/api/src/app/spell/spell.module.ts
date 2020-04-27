import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SpellService } from './spell.service';

@Module({
  imports: [DatabaseModule.forFeature({ tableName: 'spells' })],
  providers: [SpellService],
})
export class SpellModule {}
