import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '@Entity/spell.entity';

import { SpellController } from '@Character/spell/spell.controller';
import { SpellService } from '@Character/spell/spell.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spell])],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
