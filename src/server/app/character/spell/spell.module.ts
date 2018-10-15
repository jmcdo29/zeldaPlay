import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from '@Entity/spell.entity';

import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Spell])
  ],
  controllers: [SpellController],
  providers: [SpellService]
})
export class SpellModule {}
