import { Module } from '@nestjs/common';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';

@Module({
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
