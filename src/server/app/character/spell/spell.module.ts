import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '@Entity/spell.entity';

import { AuthModule } from '@Auth/auth.module';
import { SpellController } from '@Character/spell/spell.controller';
import { SpellService } from '@Character/spell/spell.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spell]), AuthModule],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
