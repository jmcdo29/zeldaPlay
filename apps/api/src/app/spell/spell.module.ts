import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SpellResolver } from './spell.resolver';
import { SpellService } from './spell.service';

@Module({
  imports: [DatabaseModule.forFeature({ tableName: 'spells' })],
  providers: [SpellResolver, SpellService],
})
export class SpellModule {}
