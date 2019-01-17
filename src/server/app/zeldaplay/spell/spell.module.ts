import { Module } from '@nestjs/common';

import { SharedModule } from '@Shared/shared.module';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';

@Module({
  imports: [SharedModule],
  controllers: [SpellController],
  providers: [SpellService, DbSpellService]
})
export class SpellModule {}
