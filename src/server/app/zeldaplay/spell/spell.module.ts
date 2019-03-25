import { Module } from '@nestjs/common';

import { SharedServerModule } from '@Shared/shared.module';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from '@Spell/spell.service';

@Module({
  imports: [SharedServerModule],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellServerModule {}
