import { Module } from '@nestjs/common';

import { SharedServerModule } from '@Shared/shared.module';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';

@Module({
  imports: [SharedServerModule],
  controllers: [SpellController],
  providers: [SpellService, DbSpellService]
})
export class SpellServerModule {}
