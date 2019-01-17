import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '@Entity/spell.entity';
import { SharedModule } from '@Shared/shared.module';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Spell]), SharedModule],
  controllers: [SpellController],
  providers: [SpellService, DbSpellService]
})
export class SpellModule {}
