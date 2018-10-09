import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '../../entities/spell.entity';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spell])],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
