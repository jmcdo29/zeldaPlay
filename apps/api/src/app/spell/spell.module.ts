import { Module } from '@nestjs/common';
import { SpellResolver } from './spell.resolver';
import { SpellService } from './spell.service';

@Module({
  providers: [SpellResolver, SpellService],
})
export class SpellModule {}
