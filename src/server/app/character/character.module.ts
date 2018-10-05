import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from '../entities/character_schema';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters/characters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharacterModule {}
