import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '@Entity/spell.entity';

import { AuthModule } from '@Auth/auth.module';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from '@Spell/spell.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Spell]), AuthModule],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
